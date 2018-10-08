import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
  	{
        path: '/login',
        component: resolve => require.ensure([], () => resolve(require('@/components/Login')), 'wrap'), 
    },
    {
        path: '/wrap',
        name: '容器',
        component: resolve => require.ensure([], () => resolve(require('@/components/Wrap')), 'wrap'),
        redirect: '/wrap/index',
        children: [
	      	{
	      		path: 'index',

	      		//如果分割了路由，在加载首页的时候只会加载首页对应的路由和界面
	      		//下面是分割路由的写法，就是如下一行代码，不需要额外的配置，不需要提前引入组件
	      		//固定写法 resolve => require.ensure([], () => resolve(require(组件路径)), 这里就是要把这块路由分割打包成什么名字，随便写，相同的名字打包在一起，比如可以在相同模块的所有路由打包到一起)
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
