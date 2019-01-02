<template>
  <section class="search">
    <div class="search-wrap flex flex-justify-between">
      <div class="flex-center search-icon">
        <img class="search-icon-img" src="~assets/icon/search.svg">
      </div>
      <input 
      class="search-input font-l"
      type='text' 
      placeholder="请输入关键字进行搜索" 
      autofocus 
      v-model="keywords"
      @keyup.enter="getArticleList"      
      />
      <div catchtap="clear" class="flex flex-align-center flex-justify-center search-clear">
        <img class="search-clear-icon" src="~assets/icon/close-white.svg">
      </div>
      <span class="font-l cancle" @click="$router.go(-1)">取消</span>
    </div>

    <section v-if="hasGotData" class="gray9 font-xs search-text">
      <span>已为您搜索到</span>
      <span class="primary">“{{ keywords }}”</span>
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
      total: 0,
      cp: 1,
      ps: 10
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
      this.dataList = [];
      this.hasGotData = false;

      let { keywords , ps , cp } = this;
      if(!keywords || !keywords.replace(/ /g,'')) {
        this.$message('请输入搜索关键字');
        return;
      }

      let { list, recordCount } = await getArticleList(ps,cp,keywords,'CreateTime');
      this.dataList = list;
      this.total = recordCount;
      this.hasGotData = true;
    },

  },
  created() {
    
  },
  mounted() {
    
  },
}
</script>
