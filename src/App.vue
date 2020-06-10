<template>
  <div id="app">
    <div class="header">
      <el-input placeholder="输入 URL，回车确认" v-model="urlTyping" @change="onChange">
        <el-button slot="append">Go</el-button>
      </el-input>
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
</style>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
