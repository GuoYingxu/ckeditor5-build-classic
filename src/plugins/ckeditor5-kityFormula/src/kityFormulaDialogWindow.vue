<template>
  <div class='kityDialog-container'>
    <div class='kityDialog-title'>插入公式</div>
    <iframe ref='frame' :src="url" style="height:380px;width:780px;border:1px solid #a0a0a0" frameborder = '0' scrolling = 'no'> </iframe>
    <div>
      <Button style='margin-right:10px' @click='cancelHandler' type='primary' ghost> 取消</Button>
      <Button style='margin-right:10px' @click='insertFormula("inline")' type='primary'>行内插入</Button>
      <Button style='margin-right:10px'  @click='insertFormula("block")' type='primary'>居中插入</Button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: '/static/kityformula-plugin/kityFormulaDialog.html'
    }
  },
  methods: {
    cancelHandler () {
      this.$emit('on-close')
    },
    insertFormula (type) {
      if (type === 'inline') {
        this.$refs.frame.contentWindow.onokinline((data) => {
          this.$emit('on-ok', Object.assign({}, { type: 'inline' }, { ...data }))
        })
      } else {
        this.$refs.frame.contentWindow.onok((data) => {
          this.$emit('on-ok', Object.assign({}, { type: 'block' }, { img: data }))
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .kityDialog-container{
    padding:5px;
  }
  .kityDialog-title{
    line-height: 20px;
    margin-bottom:5px;
  }
</style>
