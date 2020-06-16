<template>
  <div id="app">
    <div class="header">
      <el-form ref="urlForm" status-icon :show-message="false" @submit.native.prevent="onSubmit">
        <el-form-item :error="urlTypingError">
          <el-input placeholder="输入 URL，回车确认" v-model="urlTyping"></el-input>
        </el-form-item>
      </el-form>
      <div class="header-right">
        <el-tooltip content="设置刷新间隔，单位为秒。如果设置为 0，则停止刷新，此时可以使用快捷键“R”手动刷新。">
          <el-input-number v-model="interval" controls-position="right" size="small" :min="0" :max="5" class="number"></el-input-number>
        </el-tooltip>
        <el-link href="https://gitee.com/run27017/swagger-doc-preview/issues" target="_blank">提交反馈</el-link>
      </div>
    </div>
    <div class="main">
      <SwaggerPreview ref="swaggerPreview" :url="url" :interval="interval" v-if="url" />
    </div>
  </div>
</template>

<script>
import SwaggerPreview from './components/SwaggerPreview'

export default {
  name: 'App',
  components: {
    SwaggerPreview
  },
  data () {
    return {
      urlTyping: '',
      urlTypingError: '',
      url: '',
      r: new RegExp('^(?:[a-z]+:)?//', 'i'),
      interval: 1
    }
  },
  mounted () {
    if (this.$route.query.url) {
      this.urlTyping = this.$route.query.url
      this.onSubmit()
    }

    document.addEventListener('keyup', e => {
      if (e.target == document.body && e.key === 'r') {
        this.$refs.swaggerPreview.reload()
      }
    })
  },
  methods: {
    onSubmit () {
      if (this.urlTyping && !this.r.test(this.urlTyping)) {
        this.urlTypingError = '需要输入完整的 URL'
      } else {
        this.url = this.urlTyping
        this.urlTypingError = ''
        if (this.$route.query.url !== this.url) {
          this.$router.replace({ query: { url: this.url }})
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  max-width: 800px;
  height: 40px;
  margin: auto;
}

.main {
  height: calc(100vh - 40px);
  overflow-y: auto;
}

.header-right {
  > * {
    margin: 5px;
  }

  .number {
    width: 80px;
  }

  line-height: 40px;
  position: absolute;
  top: 0;
  right: 20px;
}
</style>

<style lang="scss">
body {
  margin: 0;
}
</style>
