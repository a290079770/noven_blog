import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index'
import logAndReg from '@/components/LogAndReg'
import article from '@/components/Article'
import mine from '@/components/Mine'
import detail from '@/components/Detail'
import search from '@/components/Search'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/logAndReg',
      name: 'logAndReg',
      component: logAndReg
    },
  	{
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    { path: '*', redirect: '/index' }
  ]
})
