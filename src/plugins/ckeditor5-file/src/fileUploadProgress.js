import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'

export default class FileUploadProgress extends Plugin {
  init () {
    const editor = this.editor
    editor.editing.downcastDispatcher.on('attribute:fileUploadStatus:file', (...args) => this.uploadStatusChange(...args))
  }

  uploadStatusChange (evt, data, conversionApi) {
    const editor = this.editor
    const fileItem = data.item
    const fileUploadId = fileItem.getAttribute('fileUploadId')
    if (!conversionApi.consumable.consume(data.item, evt.name)) {
      return
    }
    const filerepository = editor.plugins.get(FileRepository)
    const status = fileUploadId ? data.attributeNewValue : null
    const viewFigure = editor.editing.mapper.toViewElement(fileItem)
    const viewWriter = conversionApi.writer
    if (status === 'uploading') {
      const loader = filerepository.loaders.get(fileUploadId)
      if (loader) {
        _showPercent(viewFigure, viewWriter, loader, editor.editing.view)
      }
      return
    }
    if (status === 'complete' && filerepository.loaders.get(fileUploadId)) {
      _showCompleteIcon(viewFigure, viewWriter, editor.editing.view)

      _hidePercent(viewFigure, viewWriter)
      return
    }
    _hidePercent(viewFigure, viewWriter)
  }
}
function _showPercent (viewFigure, viewWriter, loader, view) {
  const progressBar = _createProgressBar(viewWriter)
  viewWriter.insert(viewWriter.createPositionAt(viewFigure, 'start'), progressBar)
  // Update progress bar width when uploadedPercent is changed.
  loader.on('change:uploadedPercent', (evt, name, value) => {
    view.change(writer => {
      writer.setStyle('width', value + '%', progressBar)
    })
  })
}

function _hidePercent (viewFigure, viewWriter) {
  _removeUIElement(viewFigure, viewWriter, 'fileprogressBar')
}

function _showCompleteIcon (viewFigure, writer, view) {
  const completeIcon = writer.createUIElement('div', { class: 'ck-image-upload-complete-icon' })

  writer.insert(writer.createPositionAt(viewFigure, 'end'), completeIcon)

  setTimeout(() => {
    view.change(writer => writer.remove(writer.createRangeOn(completeIcon)))
  }, 3000)
}
function _createProgressBar (writer) {
  const progressBar = writer.createUIElement('div', { class: 'ck-file-progress-bar' })
  writer.setCustomProperty('fileprogressBar', true, progressBar)
  return progressBar
}
function _removeUIElement (viewFigure, writer, uniqueProperty) {
  const element = _getUIElement(viewFigure, uniqueProperty)

  if (element) {
    writer.remove(writer.createRangeOn(element))
  }
}
function _getUIElement (viewFigure, uniqueProperty) {
  for (const child of viewFigure.getChildren()) {
    if (child.getCustomProperty && child.getCustomProperty(uniqueProperty)) {
      return child
    }
  }
}
