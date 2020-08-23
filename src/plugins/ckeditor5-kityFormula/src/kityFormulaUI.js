import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import formulaIcon from '../theme/icons/formula.svg'
import KityFormularView from './kityFormulaView'
export default class KityFormulaUI extends Plugin {
  static get pluginName () {
    return 'KityFormulaUI'
  }

  init () {
    const editor = this.editor
    const componentFactory = editor.ui.componentFactory
    componentFactory.add('kityformula', locale => {
      const command = editor.commands.get('kityformula')
      const button = new ButtonView(locale)
      button.set({
        label: '插入公式',
        icon: formulaIcon,
        tooltip: true
      })
      button.bind('isEnabled').to(command)

      button.on('execute', () => {
        editor.editing.view.focus()
        this._showFormulaView()
      })
      return button
    })
  }

  _showFormulaView () {
    const locale = this.editor.locale
    if (!this.formulaView) {
      this.formulaView = new KityFormularView(locale)
      this.formulaView.render()
      this.formulaView.on('close', () => {
        this.editor.ui.view.element.removeChild(this.formulaView.element)
        this.formulaView = null
      })
      this.formulaView.on('insertAsImage', () => {
        this.formulaView.element.querySelector('iframe').contentWindow.onok((data) => {
          if (notNull(data)) {
            this.editor.execute('kityFormulaInsertCommand', { type: 'image', img: data })
            this.editor.ui.view.element.removeChild(this.formulaView.element)
            this.formulaView = null
            this.editor.view.focus()
          }
        })
      })
      this.formulaView.on('insertInline', (data) => {
        this.formulaView.element.querySelector('iframe').contentWindow.onokinline((data) => {
          console.log(data)
          if (notNull(data.alt)) {
            this.editor.execute('kityFormulaInsertCommand', { type: 'inline', src: data.src, alt: data.alt })
            this.editor.ui.view.element.removeChild(this.formulaView.element)
            this.formulaView = null
            this.editor.view.focus()
          }
        })
      })
      setTimeout(() => {
        this.editor.ui.view.element.appendChild(this.formulaView.element)
      })
    }
    //
    this.formulaView.visibleClass = 'ck-fdialog-visible'
  }

  destroy () {
    if (this.formulaView) {
      this.formulaView.destroy()
      this.formulaView = null
    }
  }
}
function notNull (data) {
  return data && data.indexOf('placeholder') < 0
}
