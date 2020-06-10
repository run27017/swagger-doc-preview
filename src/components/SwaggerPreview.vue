<template>
  <div ref="swagger"></div>
</template>

<script>
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
      domNode: this.$refs.swagger
    })
    setInterval(this.reload, 1000) // TODO: 需要及时清理
  },
  methods: {
    async reload () {
      const spec = await fetch(this.url).then(response => response.text())

      if (spec !== this.spec) {
        this.spec = spec
        this.swagger.specActions.updateSpec(spec)
      }
    }
  }
}
</script>
