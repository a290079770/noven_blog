<template>
  <div class="index-wrap">
  	<header class="header global-bgcolor">
  	  <span>Noven_blog</span>
  	</header>
	<!-- 轮播图 -->
	<div class="banner global-bgcolor">
	  <mt-swipe :auto="4000">
	    <mt-swipe-item>鸡蛋从外面打开是食物，从里面打开是生命。</mt-swipe-item>
	    <mt-swipe-item>人活着就是为了改变世界。</mt-swipe-item>
	  	<mt-swipe-item>我渴望随着命运指引的方向，心平气和地、没有争吵、悔恨、羡慕，笔直走完人生旅途。</mt-swipe-item>
	  </mt-swipe>
	</div>
	<div class="article">
	  <article-item v-for="(item, index) in articles" :key="index" :listItem="item"></article-item>
	</div>
  </div>
</template>

<script>
import articleItem from './common/articleItem.vue';
export default {
  name: 'index',
  data () {
    return {
      articles: [
      	{
      	  Id: 1,
      	  Url: "http://temp.im/364x212",
      	  Author: "我是文章的作者",
      	  Title: "我是文章的标题",
      	  Createtime: "2018-10-24",
      	  Brief: "我是文章的简介"
      	},
      	{
      	  Id: 2,
      	  Url: "http://temp.im/364x212",
      	  Author: "我是文章的作者",
      	  Title: "我是文章的标题我是文章的标题我是文章的标题我是文章的标题",
      	  Createtime: "2018-10-24",
      	  Brief: "我是文章的简介我是文章的简介我是文章的简介我是文章的简介我是文章的简介我是文章的简介"
      	}
      ]
    }
  },
  components:{
    'article-item': articleItem
  },
  methods:{
    
  },

  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .header {
  	padding-left: .1rem;
	color: #eee;
  }
  .banner {
		/*margin: 0 auto;
		width: 3.64rem;*/
		width: 100%;
		height: 1.64rem;
		color: #fff;
		letter-spacing: .014rem;
		/*border: 1px solid red;*/
		.mint-swipe-items-wrap > div {
		  width: calc(100% - 0.4rem);
		  padding: .2rem;
		  text-align: center;
		}
		.mint-swipe-indicators {
		  bottom: .04rem;
		}
		.mint-swipe-indicator {
		  width: .12rem;
		  height: .06rem;
		  border-radius: .08rem;
		  background: #666;
		  opacity: .4;
		  
		}
		.mint-swipe-indicator.is-active {
		  width: .2rem;
		  background: #fff;
		}
  }
  .article {
	margin-top: .3rem;
  }
</style>
