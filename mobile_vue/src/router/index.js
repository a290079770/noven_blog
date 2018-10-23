import Vue from 'vue'
import Router from 'vue-router'
import LogAndReg from '@/components/LogAndReg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogAndReg',
      component: LogAndReg
    }
  ]
})
