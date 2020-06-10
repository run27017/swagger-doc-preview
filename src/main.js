import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI) // TODO: vue 的 element-ui 插件是什么？

new Vue({
  render: h => h(App),
}).$mount('#app')
