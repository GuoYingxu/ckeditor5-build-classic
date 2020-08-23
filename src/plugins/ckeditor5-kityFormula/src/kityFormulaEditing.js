import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import KityFormulaCommand from './kityFormulaCommand'
import KityFormulaInsertCommand from './kityFormulaInsertCommand'

import { toWidget, viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget/src/utils'
export default class KityFormulaEditing extends Plugin {
  static get pluginName () {
    return 'KityFormulaEditing'
  }

  init () {
    this._defineScema()
    this._defineConverters()
    this.editor.commands.add('kityformula', new KityFormulaCommand(this.editor))
    this.editor.commands.add('kityFormulaInsertCommand', new KityFormulaInsertCommand(this.editor))
    this.editor.editing.mapper.on('viewToModelPosition', viewToModelPositionOutsideModelElement(this.editor.model, viewElement => viewElement.hasClass('ck-inline-image')))
  }

  _defineScema () {
    const schema = this.editor.model.schema
    schema.register('formula', {
      allowIn: '$block',
      isLimit: true,
      isInline: true,
      isObject: true,
      allowAttributes: ['src', 'alt']
    })
  }

  _defineConverters () {
    const conversion = this.editor.conversion
    conversion.for('upcast').elementToElement({
      view: {
        name: 'span',
        classes: ['ck-inline-image']
      },
      model: (viewElement, modelWriter) => {
        const img = viewElement.getChild(0)
        console.log(img)
        const src = img._attrs.get('src')
        const alt = img._attrs.get('alt')
        return modelWriter.createElement('formula', { src, alt })
      }
    })

    conversion.for('editingDowncast').elementToElement({
      model: 'formula',
      view: (modelItem, viewWriter) => {
        const widgetElement = createFormulaView(modelItem, viewWriter)
        return toWidget(widgetElement, viewWriter)
      }
    })
    conversion.for('dataDowncast').elementToElement({
      model: 'formula',
      view: createFormulaView
    })
    function createFormulaView (modelItem, viewWriter) {
      const alt = modelItem.getAttribute('alt')
      const src = modelItem.getAttribute('src')

      const imageView = viewWriter.createEmptyElement('img', { src, alt, class: 'ck-inline-image-align' })
      const spanview = viewWriter.createContainerElement('span', { class: 'ck-inline-image' })
      viewWriter.insert(viewWriter.createPositionAt(spanview, 0), imageView)
      return spanview
    }
  }
}
