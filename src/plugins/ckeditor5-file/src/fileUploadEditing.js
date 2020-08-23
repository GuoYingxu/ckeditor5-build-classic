import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'
import Notification from '@ckeditor/ckeditor5-ui/src/notification/notification'
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard'
// import UpcastWriter from '@ckeditor/ckeditor5-engine/src/view/upcastwriter'

import FileUploadCommand from './fileUploadCommand'

export default class FileUploadEditing extends Plugin {
  static get requires () {
    return [FileRepository, Notification, Clipboard]
  }

  static get pluginName () {
    return 'FileUploadEditing'
  }

  init () {
    const editor = this.editor
    const doc = editor.model.document
    const schema = editor.model.schema
    const conversion = editor.conversion
    const fileRepository = editor.plugins.get(FileRepository)

    schema.extend('file', {
      allowAttributes: ['fileUploadId', 'fileUploadStatus', 'percent']
    })

    editor.commands.add('fileUpload', new FileUploadCommand(editor))

    conversion.for('upcast').attributeToAttribute({
      view: {
        name: 'a',
        key: 'fileUploadId'
      },
      model: 'fileUploadId'
    })
    conversion.for('upcast').attributeToAttribute({
      view: {
        name: 'a',
        key: 'data-percent'
      },
      model: 'percent'
    })

    doc.on('change', () => {
      const changes = doc.differ.getChanges({ includeChangesInGraveyard: true })

      for (const entry of changes) {
        if (entry.type === 'insert' && entry.name !== '$text') {
          const item = entry.position.nodeAfter
          const isInGraveyard = entry.position.root.rootName === '$graveyard'
          for (const file of getFilesFromChangeItem(editor, item)) {
            const fileUploadId = file.getAttribute('fileUploadId')
            if (!fileUploadId) {
              continue
            }

            const loader = fileRepository.loaders.get(fileUploadId)
            if (!loader) {
              continue
            }
            if (isInGraveyard) {
              loader.abort()
            } else if (loader.status === 'idle') {
              editor.model.enqueueChange('transparent', writer => {
                writer.setAttribute('fileUploadStatus', 'waiting', file)
                writer.setAttribute('percent', '100', file)
              })
              this._upload(loader, file)
            }
          }
        }
      }
    })
  }

  _upload (loader, fileElement) {
    const editor = this.editor
    const model = editor.model
    const fileRepository = editor.plugins.get(FileRepository)
    const notification = editor.plugins.get(Notification)
    const promis = loader.upload()
    model.enqueueChange('transparent', writer => {
      writer.setAttribute('fileUploadStatus', 'uploading', fileElement)
    })
    return promis.then(
      data => {
        model.enqueueChange('transparent', writer => {
          writer.setAttributes({ fileUploadStatus: 'complete', url: data.default }, fileElement)
        }
        )
        clean()
      }
    ).catch(error => {
      if (loader.status === 'error' && error) {
        notification.showWarning(error, {
          title: '文件上传失败',
          namespace: 'upload'
        })
      }
      clean()

      // Permanently remove image from insertion batch.
      model.enqueueChange('transparent', writer => {
        writer.remove(fileElement)
      })
    })
    function clean () {
      model.enqueueChange('transparent', writer => {
        writer.removeAttribute('fileUploadId', fileElement)
        writer.removeAttribute('fileUploadStatus', fileElement)
      })
      fileRepository.destroyLoader(loader)
    }
  }
}

function getFilesFromChangeItem (editor, item) {
  return Array.from(editor.model.createRangeOn(item)).filter(value => value.item.is('file')).map(value => value.item)
}
