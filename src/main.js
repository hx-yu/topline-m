import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入适配组件
import 'amfe-flexible'

// 引入vant组件
import './utils/register-vant'

// 引入样式文件
import './styles/index.less'

// 引入验证组件
import './utils/validation'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
