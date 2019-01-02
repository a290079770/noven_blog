<template>
  <section class="mc list">
    <div class="article-list-navbar">
     <div class="flex flex-align-center flex-justify-between article-list-navbar-cont">
       <div class="flex flex-align-center article-list-navbar-item-cont ">
         <div 
         v-for="(item,index) in ['最新','精选','热门']" 
         :key="index"
         class="font article-list-navbar-item"
         :class="{'article-list-navbar-item-active':index == activeIndex}"
         @click="changeNavAction(index)"
         >
           {{item}}
         </div>

         <!-- navbar底部边框 -->
         <div :style="{transform: `translate(${activeIndex * 1.06}rem)`}" class="article-list-navbar-item article-list-navbar-item-place"></div>
       </div>

       <div class="flex flex-align-center flex-justify-center article-list-search">
         <div class="flex flex-align-center gray9 font article-list-search-input" @click="goSearch">
           <img class="article-list-search-icon" mode="aspectFit" src="~assets/icon/search.svg">
           <span> 搜索您感兴趣的文章 </span>    
         </div>
       </div>
     </div>
   </div>

   <section class="article-list-cont">
     <article-list-item :item="item" v-for="(item,index) in dataList" :key="index"/>
   </section>
  </section>
</template>

<script>
import { getArticleList } from '~/assets/service/articleService'
import ArticleListItem from '~/components/articleListItem'
export default {
  data() {
    return {
      dataList:[],
      activeIndex: 0,
    }
  },

  components:{
    'article-list-item':ArticleListItem
  },

  methods:{
    /**
     * [getArticleList 获取文章列表]
     * @param  {[StriNg]} listName [对应this.data里的三个列表]
     * @return {[type]}          [description]
     */
    async getArticleList(listName) {
      let orderBy = [
          {
            listName:'dataList',
            order:'CreateTime',
            ps:10
          },
          {
            listName:'bannerList',
            order:'ReadCount',
            ps:5
          },
          {
            listName:'recommendList',
            order:'CollectCount',
            ps:10
          },
      ];

      let { order , ps } = orderBy.find(item => item.listName == listName);
      let { list } = await getArticleList(ps,1,'',order);
      this.dataList = list;
    },

    //改变文章分类
    changeNavAction(index) {
      this.activeIndex = index;
    },

    goSearch() {

    }
  },
  computed:{
    isLogin() {
      try {
        return JSON.parse(localStorage.userInfo);
      }catch(e) {
        //没有用户信息的话用默认的
        return false;
      }
    }
  },
  created() {
    //获取用户信息,如果有就显示
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
    }catch(e) {
      //没有用户信息的话用默认的
    }

    this.getArticleList('dataList');
  },
  mounted() {
    
  },
}
</script>
