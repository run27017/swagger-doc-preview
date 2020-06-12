<template>
  <div id="app">
    <div class="header">
      <el-input placeholder="输入 URL，回车确认" v-model="urlTyping" @change="onChange">
        <el-button slot="append">Go</el-button>
      </el-input>
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
      url: ''
    }
  },
  methods: {
    onChange (url) {
      this.url = this.urlTyping
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
  right: 20px;
}
</style>

<style lang="scss">
body {
  margin: 0;
}
</style>
