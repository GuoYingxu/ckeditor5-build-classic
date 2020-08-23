import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
// import FileCommand from './fileCommand'
import { toWidget, viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget/src/utils'

export default class FileEditing extends Plugin {
  constructor (editor) {
    super(editor)
    editor.config.define('file', {
      upload: {
        types: ['txt', 'rar', 'zip', 'doc', 'docx', 'pdf', 'xls', 'xlsx']
      }
    })
  }

  init () {
    this._defineScema()
    this._defineConverters()
    // this.editor.commands.add('fileUpload', new FileUploadCommand(this.editor))
    // this.editor.commands.add('file', new FileCommand(this.editor))
    this.editor.editing.mapper.on('viewToModelPosition', viewToModelPositionOutsideModelElement(this.editor.model, viewElement => viewElement.hasClass('ck-file')))
  }

  _defineScema () {
    const schema = this.editor.model.schema
    schema.register('file', {
      allowWhere: '$text',
      isLimit: true,
      isInline: true,
      isObject: true,
      // isBlock: true,
      allowAttributes: ['name', 'url', 'filetype']
    })
    // schema.on('checkChild', (evt, args) => {
    //   const context = args[0]
    //   const childDefinition = args[1]

    //   // if(context.endsWith('file')){
    //   // }
    //   if (childDefinition && childDefinition.name === 'codeBlock') {
    //     console.log(context)
    //     // if (containsFile(context)) {
    //     //   console.log(context, childDefinition.name)
    //     //   // Prevent next listeners from being called.
    //     //   evt.stop()
    //     //   // Set the checkChild()'s return value.
    //     //   evt.return = false
    //     // }
    //   }
    // }, { priority: 'high' })

    // function containsFile (context) {
    //   console.log(JSON.stringify(context.toJSON()))
    //   return JSON.stringify(context.toJSON()).indexOf('name: file') >= 0
    // }
  }

  _defineConverters () {
    const conversion = this.editor.conversion

    conversion.for('upcast').elementToElement({
      view: {
        name: 'a',
        classes: ['ck-file']
      },
      model: (viewElement, modelWriter) => {
        const name = viewElement.getChild(0).data
        const url = viewElement.getAttribute('href')
        const filetype = viewElement.getAttribute('data-filetype') || 'document'
        return modelWriter.createElement('file', { name, url, filetype })
      }
    })

    conversion.for('editingDowncast').elementToElement({
      model: 'file',
      view: (modelItem, viewWriter) => {
        const widgetElement = createFileView(modelItem, viewWriter)
        return toWidget(widgetElement, viewWriter)
      }
    })
    conversion.for('dataDowncast').elementToElement({
      model: 'file',
      view: createFileView
    })
    conversion.for('downcast').add(modelToViewAttributeConverter('url'))

    function createFileView (modelItem, viewWriter) {
      const name = modelItem.getAttribute('name')
      const filetype = modelItem.getAttribute('filetype') || 'document'
      const fileView = viewWriter.createContainerElement('a', {
        class: `ck-file ck-file-${filetype}`,
        href: modelItem.getAttribute('url'),
        download: 'download'
      })
      const innerText = viewWriter.createText(name)
      viewWriter.insert(viewWriter.createPositionAt(fileView, 0), innerText)
      return fileView
    }
  }
}
export function modelToViewAttributeConverter (attributeKey) {
  return dispatcher => {
    dispatcher.on(`attribute:${attributeKey}:file`, converter)
  }

  function converter (evt, data, conversionApi) {
    if (!conversionApi.consumable.consume(data.item, evt.name)) {
      return
    }

    const viewWriter = conversionApi.writer
    const figure = conversionApi.mapper.toViewElement(data.item)
    const viewattributeKey = attributeKey === 'url' ? 'href' : data.attributeKey
    viewWriter.setAttribute(viewattributeKey, data.attributeNewValue || '', figure)
  }
}
