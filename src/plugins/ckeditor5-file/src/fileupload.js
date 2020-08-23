import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import FileUploadUI from './fileUploadUI'
import FileUploadEditing from './fileUploadEditing'
import FileUploadProgress from './fileUploadProgress'

export default class FileUpload extends Plugin {
  static get pluginName () {
    return 'FileUpload'
  }

  static get requires () {
    return [FileUploadEditing, FileUploadUI, FileUploadProgress]
  }
}
