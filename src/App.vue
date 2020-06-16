<template>
  <div id="app">
    <div class="header">
      <el-form ref="urlForm" status-icon :show-message="false" @submit.native.prevent="onSubmit">
        <el-form-item :error="urlTypingError">
          <el-input placeholder="输入 URL，回车确认" v-model="urlTyping"></el-input>
        </el-form-item>
      </el-form>
      <el-link href="https://gitee.com/run27017/swagger-doc-preview/issues" target="_blank" class="issues">提交反馈</el-link>
    </div>
    <div class="main">
      <SwaggerPreview :url="url" v-if="url" />
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
      r: new RegExp('^(?:[a-z]+:)?//', 'i')
    }
  },
  mounted () {
    if (this.$route.query.url) {
      this.urlTyping = this.$route.query.url
      this.onSubmit()
    }
  },
  methods: {
    onSubmit () {
      if (this.urlTyping && !this.r.test(this.urlTyping)) {
        this.urlTypingError = '需要输入完整的 URL'
      } else {
        this.url = this.urlTyping
        this.urlTypingError = ''
        this.$router.push({ query: { url: this.url }})
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

.issues {
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
