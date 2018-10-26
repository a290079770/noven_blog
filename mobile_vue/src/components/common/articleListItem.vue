<template>
	<div class="article-list-box" @click="toDetail">
		<div class="article-list-item">
			<div class="title-row">
        <span class="yuanchuang">原创</span>   
        <span class="title">{{ listItem.Title }}</span>   
      </div>
      <div class="brief">
        {{ listItem.Brief }}
      </div>
      <div class="imgs">
        <img v-for="item in 3" :src="listItem.Url">
      </div>
      <!-- 作者、阅读量、收藏量 -->
      <div class="other-info">
        <span class="author">
          <img :src="listItem.Url">
          <span class="autor-name">{{ listItem.Author }}</span>
        </span>
        <span class="tongji">
          阅读量：<span class="read-count">{{ listItem.ReadCount }}</span>
          收藏量：<span class="collect-count">{{ listItem.CollectCount }}</span>
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
      .title-row {
        display: flex;
        align-items: center;
        .yuanchuang {
          padding: .04rem 0.2rem;
          font-size: .1rem;
          color: red;
          border: 1px solid red;
          box-sizing: border-box;
          border-radius: 4px;
        }
        .title {
          margin-top: 0;
          margin-left: .1rem;
          font-size: .14rem;
          width: 2.7rem;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis; 
          white-space: nowrap;
        }
      }
      .brief {
        margin-top: .1rem;
        font-size: .12rem;
        color: #666;
        width: 3.4rem;
        display:-webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: .24rem;
        max-height: .72rem;
      }
      .imgs {
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
      .other-info {
        margin-top: .1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .12rem;
        .author {
          display: flex;
          align-items: center;
          img {
            width: .3rem;
            height: .3rem;
            border-radius: 50%;
            margin-right: .1rem;
          }
        }
        .tongji {
          .read-count {
            margin-right: .2rem;
            color: red;
          }
          .collect-count {
            margin-right: .1rem;
            color: red;
          }
        }
      }
    }
  }
	
</style>
