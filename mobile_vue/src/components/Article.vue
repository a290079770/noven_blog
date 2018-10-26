<template>
  <div class="article-wrap">
    <div class="article-title">文章列表</div>
    <div class="list-nav">
      <mt-navbar v-model="selected" @click.native="chooseNav">
        <mt-tab-item id="newest">最新</mt-tab-item>
        <mt-tab-item id="choiceness">精选</mt-tab-item>
        <mt-tab-item id="hot">热门</mt-tab-item>
      </mt-navbar>
      <mt-search
        v-model="value"
        placeholder="搜索"
        @click.native="toSearch">
      </mt-search>
    </div>
    <div class="article-list">
      <article-list-item v-for="(item, index) in articleList" :key="index" :listItem="item"></article-list-item>
    </div>
  </div>
</template>

<script>
import articleListItem from './common/articleListItem.vue';
export default {
  name: 'articles',
  data () {
    return {
      selected: 'newest',
      value: '',
      articleList: [
        {
          Id: 3,
          Url: "http://temp.im/364x212",
          Author: "我是文章的作者",
          Title: "我是文章的标题",
          Createtime: "2018-10-24",
          ReadCount: 999,
          CollectCount: 88,
          Brief: "我是文章的简介"
        },
        {
          Id: 4,
          Url: "http://temp.im/364x212",
          Author: "我是文章的作者",
          Title: "我是文章的标题我是文章的标题我是文章的标题我是文章的标题",
          Createtime: "2018-10-24",
          ReadCount: 9,
          CollectCount: 8,
          Brief: "我是文章的简介我是文章的简介我是文章的简介我是文章的简介我是文章的简介我是文章的简介我是文章的简介我是文章的简介我是文章的简介我是文章的简介我是文章的简介我是文章的简介"
        }
      ]
    }
  },
  components:{
    'article-list-item': articleListItem
  },
  methods:{
    chooseNav() {
      console.log(this.selected)
    },
    toSearch() {
      this.$router.push({
        path: "/search", 
        // name: '要跳转的路径的 name,在 router 文件夹下的 index.js 文件内找',
        // params: { 
        //   id: this.listItem.Id, 
        // }
        // query: {
        //   id: this.listItem.Id,
        // }
      })
    }
  },

  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .article-title {
    margin-top: .5rem;
    text-align: center;
    font-size: .24rem;
  }
  .list-nav {
    margin-top: .5rem;
    padding: 0 .2rem .03rem;
    display: flex;
    justify-content: space-between;
    /*align-items: center;*/
    height: .5rem;
    border-bottom: 1px solid red;
    .mint-navbar {
      width: 80%;
    }
    .mint-navbar .mint-tab-item.is-selected {
      color: red;
      box-sizing: border-box;
      border-bottom: 3px solid red;
      .mint-tab-item-label {
        font-size: .18rem;
        font-weight: 600;
      }
    }
    .mint-search {
      height: 100%;
      .mint-searchbar {
        background: transparent;
        .mint-searchbar-inner {
          height: .2rem;
          background: #eee;
          border-radius: .05rem;
          .mint-searchbar-core {
            background: #eee;
            padding-left: .08rem;
          }
        }
      }
      .mint-searchbar-cancel {
        display: none;
      }
    }
  }
  .article-list {
    margin-top: .2rem;
  }
	
</style>
