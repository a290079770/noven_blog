<template>
  <div class="article-box">
	<div class="article-item" @click="toDetail">
	  <div class="article-img">
			<img :src="listItem.Url">
	  </div>
	  <div class="article-item-author-info">
			<span class="article-word">article</span>
			<span class="article-item-author">@{{ listItem.Author }}</span>
			<span class="article-item-time">{{ listItem.Createtime }}</span>
	  </div>
	  <div class="article-item-title">
			{{ listItem.Title }}
	  </div>
	  <div class="article-item-brief">
			{{ listItem.Brief }}
	  </div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'article-item',
  data () {
    return {
      
    }
  },
  props: ['listItem'],
  methods:{
    toDetail() {
      // console.log(this.listItem.Id)
      this.$router.push({
        path: "/detail", 
        // name: '要跳转的路径的 name,在 router 文件夹下的 index.js 文件内找',
        // params: { 
        //   id: this.listItem.Id, 
        // }
        query: {
          id: this.listItem.Id,
        }
      })
    }
  },

  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .article-box {
  	padding: 0 .2rem;
  	.article-item {
			/*margin: 0 auto;*/
			margin-bottom: .3rem;
			padding-bottom: .3rem;
			/*width: 3.64rem;*/
			min-height: 3.4rem;
			border: 1px solid #eee;
			box-shadow: 0 4px 8px #ddd;
			.article-img {
			  width: 100%;
			  height: 2.12rem;
			  background: yellow;
			  img {
				width: 100%;
				height: 100%;
			  }
			}
			.article-item-author-info {
			  margin-top: .1rem;
		   	  text-align: center;
			  .article-word {
				color: #5ed49d;
			  }
			  .article-item-author, .article-item-time {
				margin-left: .2rem;
			  }
			  .article-item-time {
				font-size: .12rem;
			  }
			}
			.article-item-title {
			  margin-top: .1rem;
			  padding: 0 .2rem;
			  font-size: .18rem;
			  text-align: center;
			}
			.article-item-brief {
			  margin-top: .2rem;
			  text-align: center;
			  font-size: .12rem;
			  color: #666;
			}
		  }
  }
  
</style>
