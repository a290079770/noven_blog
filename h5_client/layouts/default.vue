<template>
  <div class="flex flex-column flex-justify-between  layout">
		<div class="layout-header bg-full-img">
			<div class="text-ess-1 info layout-header-text font-lg">
				{{ pageTitle }}
			</div>
		</div>

    <div class="flex-1 font layout-cont">
    	<nuxt/>
    </div>

    <div class="layout-footer">
    	<div class="layout-footer-bg bg-full-img"></div>
    	<nv-footer/>
    </div>


    <!-- 添加文章按钮 -->
		<add-article-btn v-if="isAddBtnShow"/>
  </div>
</template>

<script >
	import Footer from '@/components/Footer'
	import AddArticleBtn from '@/components/addArticleBtn'
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
			'add-article-btn':AddArticleBtn
		},

		computed:{
	  },

	  methods:{
	  	setAddBtnShow() {
	  		let { path } = this.$route;
	  		let { isLogin , hideAddBtnPages } = this;

	  		this.isAddBtnShow = isLogin && !hideAddBtnPages.includes(path.replace(/\//g,''));
	  	},

	  	setLogin() {
	  		try {
	        this.isLogin = JSON.parse(localStorage.userInfo);
	      }catch(e) {
	        //没有用户信息的话用默认的
	        this.isLogin = false; 
	      }
	  	}
	  },

	  mounted() {
	  	this.setLogin();
	  	this.setAddBtnShow();
	  },

		watch: {
			$route(nv) {
				let { path } = nv;
				//修改页面标题
				let pageTitle = sessionStorage.pageTitle;
				this.pageTitle = pageTitle || 'Noven Blog';

				//每次切换页面，判定是否登录
				this.setLogin();
				//决定新增按钮是否显示
				this.setAddBtnShow();
			}
		}
	}
</script>