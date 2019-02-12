<template>
  <div class="flex flex-column flex-justify-between  layout">
		<nv-header :isBackBtnShow="isBackBtnShow" :pageTitle="pageTitle"/>

    <div class="flex-1 font layout-cont">
    	<nuxt/>
    </div>

    <div class="layout-footer">
    	<div class="layout-footer-bg bg-full-img"></div>
    	<nv-footer/>
    </div>


    <!-- 添加文章按钮 -->
		<add-article-btn v-if="isAddBtnShow"/>

		 <!-- 退出按钮 -->
		<exit-btn v-if="isExitBtnShow"/>
  </div>
</template>

<script >
	import Footer from '@/components/Footer'
	import Header from '@/components/Header'
	import AddArticleBtn from '@/components/addArticleBtn'
	import ExitBtn from '@/components/exitBtn'
	export default {
		data() {
			return {
				pageTitle:'Noven Blog',
				isAddBtnShow: true,
				hideAddBtnPages: ['addArticle','preview','login','myList'],
				isLogin: false,
			}
		},
		components:{
			'nv-footer':Footer,
			'nv-header':Header,
			'add-article-btn':AddArticleBtn,
			'exit-btn':ExitBtn,
		},

		computed:{
			//新增文章按钮
			isBackBtnShow() {
				//需要隐藏的页面路由
				let hidePages = ['','index','list','feedback','login','my','preview'];
				let { path } = this.$route;

				return !hidePages.includes(path.replace(/\//g,''));
			},

			//退出按钮
			isExitBtnShow() {
				let { isLogin } = this;
	  		let authAccess = this.authAccess();
				return isLogin && !authAccess;
			}
	  },

	  methods:{
	  	setAddBtnShow() {
	  		let { path } = this.$route;
	  		let { isLogin , hideAddBtnPages } = this;
	  		let authAccess = this.authAccess();

	  		this.isAddBtnShow = isLogin && authAccess && !hideAddBtnPages.includes(path.replace(/\//g,''));
	  	},

	  	setLogin() {
	  		try {
	        this.isLogin = JSON.parse(localStorage.userInfo);
	      }catch(e) {
	        //没有用户信息的话用默认的
	        this.isLogin = false; 
	      }
	  	},

	  	//判断登录用户是否有权限进入用户中心
	  	authAccess() {
	  		try {
	  			let { UserType } = this.isLogin;
		      return UserType && UserType >= this.authPermission;
	  		}catch(e) {
	  			return false;
	  		}
	  	}
	  },

	  mounted() {
	  	this.setLogin();
	  	this.setAddBtnShow();

	  	this.pageTitle = sessionStorage.pageTitle || 'Noven技术生涯经验分享'
	  	document.addEventListener('setItem', ()=>{
	  		this.pageTitle = sessionStorage.pageTitle || 'Noven技术生涯经验分享'
	  	}, false)
	  },

		watch: {
			$route(nv) {
				//每次切换页面，判定是否登录
				this.setLogin();
				//决定新增按钮是否显示
				this.setAddBtnShow();
			},
		}
	}
</script>