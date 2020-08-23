import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import FileEditing from './fileEditing'
import '../theme/file.css'
export default class File extends Plugin {
  static get pluginName () {
    return 'File'
  }

  static get requires () {
    return [FileEditing]
  }
}
