import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import echarts from 'echarts'
import './styles/index.scss'
import './icons/index'
import axios from 'axios'
import './mock/index'
import Mock from './mock/mock'
Mock.start()
Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(MuseUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
// 配置baseUrl
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
