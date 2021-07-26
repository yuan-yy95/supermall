import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 安装toast

Vue.prototype.$bus=new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})