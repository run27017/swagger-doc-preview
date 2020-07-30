<template>
  <div id="app">
    <el-container>
      <el-aside width="350px" class="aside">
        <div class="aside-wrapper">
          <h2>历史记录</h2>
          <el-link v-for="(url, index) in latestHistory" :key="index" @click="changeURL(url)" class="history-link">
            <div class="link-wrapper">
              <span>{{ url }}</span>
            </div>
          </el-link>
        </div>
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
            <el-tooltip content="设置刷新间隔，单位为秒。如果设置为 0，则停止刷新，此时可以使用快捷键“R”手动刷新。">
              <el-input-number v-model="interval" controls-position="right" size="small" :min="0" :max="5" class="number"></el-input-number>
            </el-tooltip>
            <el-link href="https://gitee.com/run27017/swagger-doc-preview/issues" target="_blank">提交反馈</el-link>
          </div>
        </el-header>
        <el-main>
          <SwaggerPreview ref="swaggerPreview" :url="url" :interval="interval" v-if="url" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import history from './tools/history'
import SwaggerPreview from './components/SwaggerPreview'
window.$history = history

export default {
  name: 'App',
  components: {
    SwaggerPreview
  },
  data () {
    return {
      urlTyping: '',
      urlTypingError: '',
      url: '',
      r: new RegExp('^(?:[a-z]+:)?//', 'i'),
      interval: 1,
      latestHistory: []
    }
  },
  async mounted () {
    if (this.$route.query.url) {
      this.urlTyping = this.$route.query.url
      this.onSubmit()
    }

    document.addEventListener('keyup', e => {
      if (e.target == document.body && e.key === 'r') {
        this.$refs.swaggerPreview.reload()
      }
    })

    await history.prepare()
    this.latestHistory = (await history.query(null, 10000)).reverse()
  },
  methods: {
    onSubmit () {
      if (this.urlTyping && !this.r.test(this.urlTyping)) {
        this.urlTypingError = '需要输入完整的 URL'
      } else {
        this.urlTypingError = ''
        this.changeURL(this.urlTyping)
      }
    },
    async changeURL (url) {
      this.url = url
      if (this.$route.query.url !== url) {
        this.$router.replace({ query: { url }})
        await history.push(url)
        this.latestHistory = (await history.query(null, 10000)).reverse()
      }
    },
    queryHistory (inputString, cb) {
      history.query(inputString).then(urls => cb(
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
  .aside-wrapper {
    width: inherit;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    word-break: break-all;
    h2 {
      margin: 5px 14px;
    }
    .history-link {
      display: block;
      font-size: 1em;
      padding: 5px 14px;
      color: #535353;
      transition: all .2s ease;
      line-height: 1em;
      &:hover {
        background-color: #dadada;
      }
      .link-wrapper {
        display: list-item;
        list-style-type: circle;
        margin-left: 10px;
      }
    }
  }
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
