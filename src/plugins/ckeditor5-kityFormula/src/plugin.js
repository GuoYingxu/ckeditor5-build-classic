import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import KityFormulaEditing from './kityFormulaEditing'
import KityFormulaUI from './kityFormulaUI'
import '../theme/formula.css'
class KityFormula extends Plugin {
  static get pluginName () {
    return 'KityFormula'
  }

  static get requires () {
    return [KityFormulaEditing, KityFormulaUI]
  }
}
export default KityFormula
