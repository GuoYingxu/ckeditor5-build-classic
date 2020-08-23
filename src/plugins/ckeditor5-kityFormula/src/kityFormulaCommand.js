import Command from '@ckeditor/ckeditor5-core/src/command'
// import KityFormularView from './kityFormulaView'
// import CKEditorError from '@ckeditor/ckeditor5-utils/src/ckeditorerror'

export default class KityCommand extends Command {
  constructor (editor) {
    super(editor)
    // Remove default document listener to lower its priority.
    this.stopListening(this.editor.model.document, 'change')

    // Lower this command listener priority to be sure that refresh() will be called after link & image refresh.
    this.listenTo(this.editor.model.document, 'change', () => this.refresh(), { priority: 'low' })
  }

  refresh () {
    this.isEnabled = true // this.editor.commands.get('kityformula').isEnabled
  }

  execute () {

  }
}
