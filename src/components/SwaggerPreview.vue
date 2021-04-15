<template>
  <div>
    <el-alert :title="errorMessage" type="error" effect="light" :closable="false" v-if="error"></el-alert>
    <div ref="swagger"></div>
  </div>
</template>

<script>
import SwaggerUIBundle from './SwaggerUIBundle'

export default {
  name: 'SwaggerPreview',
  props: {
    url: String,
    interval: {
      type: Number,
      default: 0
    },
    config: {
      type: Object
    }
  },
  data () {
    return {
      spec: '',
      error: null,
      intervalId: null
    }
  },
  computed: {
    errorMessage () {
      return `从提供的链接获取数据出现 HTTP 错误：${this.error.status} ${this.error.statusText}`
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
    },
    url: function () {
      this.reinit()
    },
    config: function () {
      this.reinit()
    }
  },
  mounted () {
    this.reinit()
  },
  beforeDestroy () {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  },
  methods: {
    reinit () {
      this.swagger = SwaggerUIBundle({
        url: this.url,
        domNode: this.$refs.swagger,
        ...this.config
      })
    },
    async reload () {
      // TODO: 这个地方的速度可能有点慢，是否需要一个的提醒
      this.$emit('loading')

      const response = await fetch(this.url)
      if (response.ok) {
        const spec = await response.text()
        if (spec !== this.spec) {
          this.spec = spec
          this.swagger.specActions.updateSpec(spec)
        }
        this.error = null
      } else {
        this.error = {
          status: response.status,
          statusText: response.statusText
        }
      }

      this.$emit('loaded')
    }
  }
}
</script>
