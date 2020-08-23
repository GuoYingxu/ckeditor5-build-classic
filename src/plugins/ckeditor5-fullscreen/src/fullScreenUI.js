import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

import ImageFullBtn from '../theme/icons/fullscreen-big.svg'
import ImageFullCancel from '../theme/icons/fullscreen-cancel.svg'
import '../theme/fullscreen.css'

export default class FullScreenUI extends Plugin {
  static get pluginName () {
    return 'FullScreenUI'
  }

  init () {
    const editor = this.editor

    editor.ui.componentFactory.add('fullScreen', locale => {
      const view = new ButtonView(locale)
      let status = 0
      view.set({
        label: '全屏',
        icon: ImageFullBtn,
        tooltip: true
      })

      view.on('execute', () => {
        window.editor = editor
        if (status === 1) {
          editor.sourceElement.nextElementSibling.removeAttribute('id')
          document.body.removeAttribute('id')
          view.set({
            label: '全屏',
            icon: ImageFullBtn,
            tooltip: true
          })
          status = 0
        } else {
          editor.sourceElement.nextElementSibling.setAttribute('id', 'fullscreeneditor')
          document.body.setAttribute('id', 'fullscreenoverlay')
          view.set({
            label: '取消全屏',
            icon: ImageFullCancel,
            tooltip: true
          })
          status = 1
        }
      })
      return view
    })
  }
}
