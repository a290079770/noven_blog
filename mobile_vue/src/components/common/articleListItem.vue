<template>
	<div class="article-list-box" @click="toDetail">
		<div class="article-list-item">
			<div class="article-list-item-title-row">
        <span class="article-list-item-yuanchuang">原创</span>   
        <span class="article-list-item-title">{{ listItem.Title }}</span>   
      </div>
      <div class="article-list-item-brief">
        {{ listItem.Brief }}
      </div>
      <div class="article-list-item-imgs">
        <img v-for="item in 3" :src="listItem.Url">
      </div>
      <!-- 作者、阅读量、收藏量 -->
      <div class="article-list-item-other-info">
        <span class="article-list-item-author">
          <img :src="listItem.Url">
          <span class="autor-name">{{ listItem.Author }}</span>
        </span>
        <span class="article-list-item-tongji">
          阅读量：<span class="article-list-item-read-count">{{ listItem.ReadCount }}</span>
          收藏量：<span class="article-list-item-collect-count">{{ listItem.CollectCount }}</span>
        </span>
      </div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'article-list-item',
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
  .article-list-box {
    padding: 0 .2rem;
    .article-list-item {
      padding: .1rem 0;
      min-height: 1.4rem;
      /*border-bottom: 1px solid red;*/
      .article-list-item-title-row {
        display: flex;
        align-items: center;
        .article-list-item-yuanchuang {
          padding: .04rem 0.2rem;
          font-size: .1rem;
          color: red;
          border: 1px solid red;
          box-sizing: border-box;
          border-radius: 4px;
        }
        .article-list-item-title {
          margin-left: .1rem;
          width: 2.7rem;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis; 
          white-space: nowrap;
        }
      }
      .article-list-item-brief {
        margin-top: .1rem;
        font-size: .12rem;
        color: #666;
        width: 3.4rem;
        display:-webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: .2rem;
        max-height: .6rem;
      }
      .article-list-item-imgs {
        margin-top: .2rem;
        display: flex;
        justify-content: space-between;
        img {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: .08rem;
        }
        img:first-child {
        }
      }
      .article-list-item-other-info {
        margin-top: .1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .12rem;
        .article-list-item-author {
          display: flex;
          align-items: center;
          & > img {
            width: .3rem;
            height: .3rem;
            border-radius: 50%;
            margin-right: .1rem;
          }
        }
        .article-list-item-tongji {
          .article-list-item-read-count {
            margin-right: .2rem;
            color: red;
          }
          .article-list-item-collect-count {
            margin-right: .1rem;
            color: red;
          }
        }
      }
    }
  }
	
</style>
