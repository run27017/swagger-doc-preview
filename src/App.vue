<template>
  <div id="app">
    <div ref="swagger"></div>
  </div>
</template>

<script>
import axios from 'axios'
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      url: 'http://localhost:3000/files/swagger.json',
      spec: ''
    }
  },
  mounted () {
    this.swagger = SwaggerUI({
      domNode: this.$refs.swagger
    })
    setInterval(this.reload, 1000)
  },
  methods: {
    async reload () {
      const response = await axios.get(this.url)
      const spec = JSON.stringify(response.data)
      if (spec !== this.spec) {
        this.spec = spec
        this.swagger.specActions.updateSpec(spec)
      }
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
