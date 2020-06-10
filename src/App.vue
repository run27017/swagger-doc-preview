<template>
  <div id="app">
    <SwaggerPreview :url="url" />
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
      url: 'http://localhost:3000/files/swagger.json'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
