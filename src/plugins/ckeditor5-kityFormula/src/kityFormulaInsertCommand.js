import Command from '@ckeditor/ckeditor5-core/src/command'

export default class KityFormulaInsertCommand extends Command {
  execute (options) {
    const editor = this.editor
    const model = editor.model
    model.change(writer => {
      console.log(options.img)
      if (options.type === 'image') {
        const viewFragment = editor.data.processor.toView(options.img)
        const modelFragment = editor.data.toModel(viewFragment)
        model.insertContent(modelFragment, model.document.selection)
      } else {
        model.change(writer => {
          insertFormula(writer, model, options)
        })
      }
    })
  }
}
function insertFormula (writer, model, attributes = {}) {
  const formularElement = writer.createElement('formula', attributes)
  writer.insert(formularElement, model.document.selection.getLastPosition())
  writer.setSelection(formularElement, 'after')
}
