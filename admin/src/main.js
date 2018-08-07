// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/styles/normalize.css'
import './assets/styles/animate.css'
import './assets/iconfont/iconfont.css'

import '../theme/index.css'

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts


import axios from './http.js'
Vue.prototype.$http = axios;
//引入axios


//引入全局方法
import util from './util'
Vue.use(util);

// Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
