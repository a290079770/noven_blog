<template>
  <section class="search">
    <div class="search-wrap flex flex-justify-between">
      <div class="flex-center search-icon">
        <img class="search-icon-img" src="~assets/icon/search.svg">
      </div>
      <input 
      class="search-input"
      type='text' 
      placeholder="请输入关键字进行搜索" 
      autofocus 
      v-model="keywords"
      @keyup.enter="getArticleList(true)"      
      />
      <div @click.stop="clear" class="flex flex-align-center flex-justify-center search-clear">
        <img class="search-clear-icon" src="~assets/icon/close-white.svg">
      </div>
      <span class="font-l cancle" @click="$router.go(-1)">取消</span>
    </div>

    <section v-if="hasGotData" class="gray9 font-xs search-text">
      <span>已为您搜索到</span>
      <span class="primary">“{{ copyKeywords }}”</span>
      <span>相关文章，共计</span>
      <span class="primary">{{ total }}</span>
      <span>篇</span>
    </section>

    <div v-if="hasGotData && dataList.length > 0" class="search-article-list">
      <article-list-item :item="item" v-for="(item,index) in dataList" :key="index"/>
    </div>

    <div v-if="hasGotData && dataList.length < 1" class="flex  flex-align-center flex-justify-center flex-column search-article-list-nodata">
      <img class="search-article-list-nodata-icon" src="~assets/icon/no-search.svg">
      <span class="font-lg gray9"> 暂无数据 </span>    
    </div>
  </section>
</template>

<script>
import { getArticleList } from '~/assets/service/articleService'
import ArticleListItem from '~/components/articleListItem'
export default {
  data() {
    return {
      dataList:[],
      hasGotData: false,
      keywords:'',
      copyKeywords:'',
      total: 0,
      cp: 1,
      ps: 5
    }
  },

  components:{
    'article-list-item':ArticleListItem
  },

  methods:{
    /**
     * [getArticleList 获取文章列表]
     * @param  {[Boolean]} isSearch [是否是执行搜索操作，如果是，则cp置为1]
     * @return {[type]}          [description]
     */
    async getArticleList(isSearch = false) {
      let { keywords , ps , cp } = this;
      if( isSearch ) {
        this.cp = cp = 1;
        if(!keywords || !keywords.replace(/ /g,'')) {
          this.$message('请输入搜索关键字');
          return;
        }
        this.hasGotData = false;
        this.copyKeywords = keywords;
      }
      

      let { list, recordCount } = await getArticleList(ps,cp,keywords,'CreateTime');
      this.dataList = cp > 1 ? [...this.dataList, ...list] : list;
      this.total = recordCount;
      this.hasGotData = true;
    },
    clear() {
      this.keywords = '';
    }
  },
  created() {
    
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
