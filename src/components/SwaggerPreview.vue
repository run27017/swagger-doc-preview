<template>
  <div ref="swagger"></div>
</template>

<script>
import axios from 'axios'
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'

export default {
  name: 'SwaggerPreview',
  props: {
    url: String
  },
  data () {
    return {
      spec: ''
    }
  },
  mounted () {
    this.swagger = SwaggerUI({
      domNode: this.$refs.swagger,
      url: this.url
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
