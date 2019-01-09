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
        
       <nuxt-link :to="{ name:'search'}"> 
         <div class="flex flex-align-center flex-justify-end article-list-search">
           <div class="flex flex-align-center gray9 font article-list-search-input">
             <img class="article-list-search-icon" mode="aspectFit" src="~assets/icon/search.svg">
             <span> 搜索您感兴趣的文章 </span>    
           </div>
         </div>
       </nuxt-link>  
     </div>
   </div>

   <section 
   class="article-list-cont" 
   >
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
      ps:10,
      cp:1,
      total: 0,
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
    async getArticleList() {
      let { ps, cp , activeIndex } = this;

      let orderBy = ['CreateTime','CollectCount','ReadCount'];
      let { list, recordCount } = await getArticleList(ps,cp,'',orderBy[activeIndex]);
      this.dataList = cp > 1 ? [...this.dataList,...list] : list;
      this.total = recordCount;
    },

    //改变文章分类
    changeNavAction(index) {
      this.activeIndex = index;
      this.cp = 1;
      this.getArticleList();
    },

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
    this.getArticleList();
  },
  mounted() {
    this.onReachBottom(()=>{
      let { ps, cp , total } = this;
      //cp > 1则是请求加载更多，cp = 1 则是首次加载
      if( cp > 1 && ps * cp >= total ) return; 
      this.cp ++;
      this.getArticleList();
    })
  },
  beforeDestroy() {
    window.onscroll = null;
  }
}
</script>
