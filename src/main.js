import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI) // TODO: vue 的 element-ui 插件是什么？

new Vue({
  render: h => h(App),
  router: new VueRouter()
}).$mount('#app')
