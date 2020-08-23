/**
 *
 *  直接插入一个文件对象
 *
 * 暂时没有用
 */
// import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'
import Command from '@ckeditor/ckeditor5-core/src/command'

import first from '@ckeditor/ckeditor5-utils/src/first'
// import { insertImage, isImageAllowed } from '../image/utils';
export default class FileCommand extends Command {
  refresh () {
    this.isEnabled = this._checkEnabled()
  }

  execute (options) {
    const editor = this.editor
    const model = editor.model
    // const filerepository = editor.plugins.get(FileRepository)
    // model.change(writer => {
    //   const filesToUpload = options.file
    //   for (const file of filesToUpload) {
    //     uploadFile(writer, model, filerepository, file)
    //   }
    // })
    model.change(writer => {
      insertFile(writer, model, options)
    })
  }

  _checkEnabled () {
    const selection = this.editor.model.document.selection
    const schema = this.editor.model.schema

    const firstBlock = first(selection.getSelectedBlocks())

    if (!firstBlock) {
      return false
    }
    if (firstBlock.name === 'codeBlock') {
      return false
    }
    return schema.checkChild(firstBlock, 'file')
  }
}
// function uploadFile (writer, model, filerepository, file) {
//   console.log('----', file)
//   const loader = filerepository.createLoader(file)
//   if (!loader) {
//     return
//   }
//   insertFile(writer, model, { uploadId: loader.id, file: file })
// }
function insertFile (writer, model, attributes = {}) {
  const fileElement = writer.createElement('file', attributes)
  writer.insert(fileElement, model.document.selection.getLastPosition())
  writer.setSelection(fileElement, 'on')
  // writer.insertText('file')
}
