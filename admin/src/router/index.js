import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
  	{
        path: '/login',
        component: resolve => require.ensure([], () => resolve(require('@/components/Login')), 'login'),
    },
    {
        path: '/wrap',
        name: '容器',
        component: resolve => require.ensure([], () => resolve(require('@/components/Wrap')), 'wrap'),
        redirect: '/wrap/index',
        children: [
	      	{
	      		path: 'index',
	      		component: resolve => require.ensure([], () => resolve(require('@/components/Index')), 'Index'),
	      	},
	      	{
	      		path: 'banner',
	      		component: resolve => require.ensure([], () => resolve(require('@/components/Banner')), 'Banner'),
	      	},
	      	{
	      		path: 'mood',
	      		component: resolve => require.ensure([], () => resolve(require('@/components/Mood')), 'Mood'),
	      	},
	      	{
	      		path: 'article',
	      		component: resolve => require.ensure([], () => resolve(require('@/components/Article')), 'Article'),
	      	},
	      	{
	      		path: 'photoAlbum',
	      		component: resolve => require.ensure([], () => resolve(require('@/components/PhotoAlbum')), 'PhotoAlbum'),
	      	},
	      	{
	      		path: 'user',
	      		component: resolve => require.ensure([], () => resolve(require('@/components/User')), 'User'),
	      	},
        ]
    },
    //如果地址栏出错，重定向到登录界面
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to,from,next)=>{
	// if(localStorage.pwd && localStorage.pwd !== '') {
 //       next();
	// }else {
	// 	//没有登录，应该自动退出系统，去到登录页面
	//    next('/login');
	// }
	// let arr = ['/userInfo','/userCenter','/orderList','/orderDetail'];

	// if(arr.indexOf(to.fullPath) !== -1) {
 //       if(localStorage.pwd && localStorage.pwd !== '') {
	//        next();
	// 	}else {
	// 		//没有登录，应该自动退出系统，去到登录页面
	// 	   next('/login');
	// 	}
	// }
	next();
})

export default router;
