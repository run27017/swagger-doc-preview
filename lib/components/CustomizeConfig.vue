<template>
  <el-popover
    placement="bottom"
    title="编辑配置代码"
    width="480"
    trigger="click"
    v-model="visible"
    ref="popover"
  >
    <el-button slot="reference" size="small">配置</el-button>
    <div class="main">
      <p>
        Swagger UI 的构建参数，点击该
        <a target="_blank" href="https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md">
          链接
        </a>
        查看帮助。
      </p>
      <p>
        <el-input type="textarea" :rows="10" v-model="editingConfig" />
      </p>
      <p>
        <el-button type="primary" size="small" @click="save">保存</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </p>
    </div>
  </el-popover>
</template>

<script>
const defaultConfigText = JSON.stringify({
  showErrors: false,
  filter: true,
  defaultModelExpandDepth: 2,
  defaultModelRendering: "model"
}, null, 2)
const STORE_KEY = 'swagger-doc-preview_config'

export default {
  name: 'CustomizeConfig',
  data () {
    return {
      visible: false,
      editingConfig: localStorage[STORE_KEY] || defaultConfigText
    }
  },
  methods: {
    getConfig () {
      if (STORE_KEY in localStorage) {
        try {
          return JSON.parse(localStorage[STORE_KEY])
        } catch (e) {
          if (e instanceof SyntaxError) {
            return JSON.parse(defaultConfigText)
          } else {
            throw e
          }
        }
      } else {
        return JSON.parse(defaultConfigText)
      }
    },
    save () {
      try {
        const config = JSON.parse(this.editingConfig)
        this.$emit('change', config)

        localStorage[STORE_KEY] = this.editingConfig

        this.visible = false
      } catch (e) {
        if (e instanceof SyntaxError) {
          this.$message.error('JSON 格式错误!')
          return
        } else {
          throw e
        }
      }
    },
    cancel () {
      this.visible = false
      this.editingConfig = localStorage[STORE_KEY] || defaultConfigText
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  p:not(:last-child) { margin-bottom: 1em; }
}
</style>
