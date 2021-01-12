<template>
  <el-popover
    placement="bottom"
    title="编辑配置代码"
    width="300"
    trigger="click"
    v-model="visible"
    ref="popover"
  >
    <el-button slot="reference" size="small">配置</el-button>
    <p>
      Swagger UI 的构建参数，点击该
      <a target="_blank" href="https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md">
        链接
      </a>
      的查看帮助。
    </p>
    <p>
      <el-input type="textarea" :rows="10" v-model="editingConfig" />
    </p>
    <p>
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </p>
  </el-popover>
</template>

<script>
export default {
  name: 'CustomizeConfig',
  model: {
    prop: 'config',
    event: 'save'
  },
  props: {
    config: {
      type: Object
    }
  },
  data () {
    return {
      visible: false,
      editingConfig: ''
    }
  },
  watch: {
    config: {
      handler() {
        this.editingConfig = JSON.stringify(this.config, null, 2)
      },
      immediate: true
    } 
  },
  methods: {
    save () {
      let editingConfigObject

      try {
        editingConfigObject = JSON.parse(this.editingConfig)
      } catch (err) {
        this.$message.error('JSON 语法错误')
        return
      }

      this.$emit('save', editingConfigObject)
      this.visible = false
    },
    cancel () {
      this.visible = false
      this.editingConfig = JSON.stringify(this.config, null, 2)
    }
  }
}
</script>
