import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import FullScreenUI from './fullScreenUI'
import FullScreenEditing from './fullScreenEditing'
import '../theme/fullscreen.css'
export default class FullScreen extends Plugin {
  static get pluginName () {
    return 'FullScreen'
  }

  static get requires () {
    return [FullScreenEditing, FullScreenUI]
  }
}
