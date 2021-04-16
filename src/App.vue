<template>
  <div id="app">
    <el-container>
      <el-aside width="350px" class="aside">
        <HistoryPanel ref="historyPanel" @clickLink="changeURL" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <el-form ref="urlForm" status-icon :show-message="false" @submit.native.prevent="onSubmit">
            <el-form-item :error="urlTypingError">
              <el-autocomplete 
                placeholder="输入 URL，回车确认" 
                v-model="urlTyping" 
                :fetch-suggestions="queryHistory" 
                class="input"
              />
            </el-form-item>
          </el-form>
          <div class="header-right">
            <CustomizeConfig ref="customizeConfig" @change="config = $event" />
            <IntervalSetting v-model="interval" :loading="loading" />
            <el-link href="https://gitee.com/run27017/swagger-doc-preview/issues" target="_blank">提交反馈</el-link>
          </div>
        </el-header>
        <el-main>
          <SwaggerPreview ref="swaggerPreview" :config="config" :url="url" :interval="interval" @loading="loading = true" @loaded="loading = false" v-if="url" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HistoryPanel from './components/HistoryPanel'
import CustomizeConfig from './components/CustomizeConfig'
import IntervalSetting from './components/IntervalSetting'
import SwaggerPreview from './components/SwaggerPreview'

export default {
  name: 'App',
  components: {
    HistoryPanel,
    CustomizeConfig,
    IntervalSetting,
    SwaggerPreview
  },
  data () {
    const data = {
      loading: false,
      config: null,
      urlTyping: '',
      urlTypingError: '',
      url: '',
      r: new RegExp('^(?:[a-z]+:)?//', 'i'),
      interval: 1
    }

    if ('interval' in localStorage) {
      data.interval = parseInt(localStorage.interval)
    }

    return data
  },
  watch: {
    interval () {
      localStorage.interval = this.interval
    }
  },
  async mounted () {
    this.config = this.$refs.customizeConfig.getConfig()
    if (this.$route.query.url) {
      this.urlTyping = this.$route.query.url
      this.url = this.$route.query.url
      this.onSubmit()
    }

    document.addEventListener('keyup', e => {
      // 浏览器中已经绑定有大量的 `CTRL` 键
      if (e.target == document.body && e.key === 'r') {
        this.$refs.swaggerPreview.reload()
      }
    })
  },
  methods: {
    onSubmit () {
      if (this.urlTyping && !this.r.test(this.urlTyping)) {
        this.urlTypingError = '需要输入完整的 URL'
      } else {
        this.urlTypingError = ''
        this.changeURL(this.urlTyping, true)
      }
    },
    async changeURL (url, pushState = false) {
      if (this.url === url) return

      this.url = url
      this.urlTyping = url
      this.$router.replace({ query: { url }})
      if (pushState) {
        await this.$refs.historyPanel.push(url)
      }
    },
    queryHistory (inputString, cb) {
      this.$refs.historyPanel.query(inputString).then(urls => cb(
        urls.map(url => {
          return { value: url }
        })
      ))
    }
  }
}
</script>

<style lang="scss" scoped>
.aside {
  min-height: 100vh;
  box-shadow: 0 2px 25px 3px #616161;
}

.header {
  max-width: 800px;
  height: 40px;
  margin: auto;

  .input {
    width: 800px;
  }
}

.header-right {
  > * {
    margin: 5px;
  }

  .number {
    width: 80px;
  }

  line-height: 40px;
  position: absolute;
  top: 0;
  right: 20px;
}

.main {
  height: calc(100vh - 40px);
  overflow-y: auto;
}

@media (max-width: 1240px) {
  .aside {
    display: none;
  }
}
</style>

<style lang="scss">
body {
  margin: 0;
}
</style>
