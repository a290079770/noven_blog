<template>
  <div class="search-wrap">
    <div class="search-box">
      <mt-search
        v-model="value"
        cancel-text="取消"
        placeholder="搜索"
        autofocus
        >
      </mt-search>
    </div>
    <div class="search-res">
      <article-list-item v-for="(item, index) in searchList" :key="index" :listItem="item"></article-list-item>
    </div>
  </div>
</template>

<script>
import articleListItem from './common/articleListItem.vue';
export default {
  name: 'search',
  data () {
    return {
      value: '',
      searchList: [
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
          Brief: "我是文章的简介。我是文章的简介。我是文章的简介。我是文章的简介。我是文章的简介。我是文章的简介。我是文章的简介。我是文章的简介。"
        }
      ]
    }
  },
  components:{
    'article-list-item': articleListItem
  },
  methods:{

  },

  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .search-wrap {
    .search-box {
      padding: 0 .2rem;
      margin-top: .3rem;
      height: .5rem;
      .mint-searchbar {
        padding: 0;
        background: #fff;
        .mint-searchbar-inner {
          height: .2rem;
          border: 1px solid #eee;
        }
      }
      .mint-searchbar-cancel {
        display: inline-block;
        font-size: .14rem;
        color: #666;
      }
    }
  }
	
</style>
