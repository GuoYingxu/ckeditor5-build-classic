
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview'

// import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import fileIcon from '../theme/icons/file.svg'

// import ButtonView from  '@ckeditor/ckeditor5-ui/src/button/buttonview'

export default class FileUI extends Plugin {
  static get pluginName () {
    return 'FileUploadUI'
  }

  init () {
    const editor = this.editor

    const viewDocument = editor.editing.view.document
    this.listenTo(viewDocument, 'click', (evt, data) => {
      data.preventDefault()
    })

    editor.ui.componentFactory.add('fileUpload', locale => {
      const view = new FileDialogButtonView(locale)
      // const button = new ButtonView(locale)
      const command = editor.commands.get('fileUpload')
      // const command = editor.command.get()
      // const fileTypes = editor.config.get('file.upload.types')
      // view.set({
      //   accseptedType: fileTypes.map( type =>)
      // })
      view.buttonView.set({
        label: '上传文件',
        icon: fileIcon,
        tooltip: true
      })

      view.buttonView.bind('isEnabled').to(command)
      // view.buttonView.bind(;'')
      view.on('done', (evt, files) => {
        const fileToUpload = Array.from(files)
        editor.execute('fileUpload', { file: fileToUpload })
      })
      // button.on('execute', () => {
      //   editor.execute('file')
      // })
      return view
    })
  }
}
