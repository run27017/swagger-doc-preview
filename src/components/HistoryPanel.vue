<template>
  <div class="history-panel">
    <h2>历史记录</h2>
    <el-link v-for="(url, index) in latestHistory"
             :key="index"
             class="history-link"
             @click="$emit('clickLink', url)"
    >
      <div class="link-wrapper">
        <span>{{ url }}</span>
      </div>
    </el-link>
  </div>
</template>

<script>
import history from '../tools/history'

export default {
  name: 'HistoryPanel',
  data () {
    return {
      latestHistory: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await history.prepare()
      this.refresh()
    },
    async refresh () {
      this.latestHistory = await history.query(null, 20)
    },
    async push (...params) {
      await history.push(...params)
      await this.refresh()
    },
    query (...params) {
      return history.query(...params)
    }
  }
}
</script>

<style lang="scss" scoped>
.history-panel {
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
</style>
