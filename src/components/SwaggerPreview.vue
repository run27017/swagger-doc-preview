<template>
  <div ref="swagger"></div>
</template>

<script>
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'

export default {
  name: 'SwaggerPreview',
  props: {
    url: String,
    interval: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      spec: '',
      intervalId: null
    }
  },
  watch: {
    interval: {
      handler () {
        if (this.intervalId) {
          clearInterval(this.intervalId)
          this.intervalId = null
        }
        if (this.interval > 0) {
          this.intervalId = setInterval(this.reload, this.interval * 1000)
        }
      },
      immediate: true // 这里尚不清楚 watch 和 mouted 的执行顺序
    }
  },
  mounted () {
    this.swagger = SwaggerUI({
      domNode: this.$refs.swagger
    })
  },
  beforeDestroy () {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
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
