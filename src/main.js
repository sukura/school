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
Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(MuseUI)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
