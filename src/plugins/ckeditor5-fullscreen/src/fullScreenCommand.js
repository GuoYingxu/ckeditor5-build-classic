import Command from '@ckeditor/ckeditor5-core/src/command'

export default class FullScreenCommand extends Command {
  refresh () {
    // this.value = value
    this.isEnabled = true
  }

  execute () {
  }
}
