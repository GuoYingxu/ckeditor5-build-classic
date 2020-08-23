import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'
import Command from '@ckeditor/ckeditor5-core/src/command'
import { isFileAllowed, insertFile } from './utils'
export default class FileUploadCommand extends Command {
  refresh () {
    this.isEnabled = isFileAllowed(this.editor.model)
  }

  execute (options) {
    const editor = this.editor
    const model = editor.model
    const fileRepository = editor.plugins.get(FileRepository)

    model.change(writer => {
      const filesToUpload = Array.isArray(options.file) ? options.file : [options.file]

      for (const file of filesToUpload) {
        uploadFile(writer, model, fileRepository, file)
      }
    })
  }
}

function uploadFile (writer, model, fileRepository, file) {
  const loader = fileRepository.createLoader(file)
  if (!loader) {
    return
  }
  const filetype = getType(file)
  insertFile(writer, model, { fileUploadId: loader.id, name: file.name, url: '', filetype: filetype })
}
function getType (file) {
  let type = 'document'
  if (file && file.type) {
    if (file.type.indexOf('image') === 0) {
      return 'img'
    }
    if (file.type.indexOf('video') === 0) {
      return 'video'
    }
    switch (file.type) {
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        type = 'ppt'
        break
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        type = 'ppt'
        break
      case 'application/x-rar':
        type = 'rar'
        break
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        type = 'doc'
        break
      case 'application/pdf':
        type = 'pdf'
        break
      case 'video/mp4':
        type = 'video'
        break
      case 'image/png':
        // type='img'
        break
      default:
        break
    }
  }
  return type
}
