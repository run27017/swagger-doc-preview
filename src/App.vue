<template>
  <div id="app">
    <div ref="swagger"></div>
  </div>
</template>

<script>
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted () {
    SwaggerUI({
      domNode: this.$refs.swagger,
      url: 'http://localhost:3000/files/swagger.json'
    })
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
