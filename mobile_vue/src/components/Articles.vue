<template>
  <div class="article-wrap">
    <div class="title">文章列表</div>
    <div class="article-list-item">
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
      articleList: [
        {
          Url: "http://temp.im/364x212",
          Author: "我是文章的作者",
          Title: "我是文章的标题",
          Createtime: "2018-10-24",
          Brief: "我是文章的简介"
        },
        {
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
  .title {
    margin-top: .5rem;
    text-align: center;
    font-size: .24rem;
  }
  .article-list-item {
    margin-top: .5rem;
  }
	
</style>
