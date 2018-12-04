<template>
  <section class="mc index list">
    <section v-if="keywords" class="gray9 font list-search">
      <span>已为您搜索到</span>
      <span class="primary">“{{ keywords }}”</span>
      <span>相关文章，共计</span>
      <span class="primary">{{ total }}</span>
      <span>篇</span>
    </section>
    <section class="flex flex-justify-between index-body">
      <section class="index-list"> 
        <article-list-item :item="item" v-for="(item,index) in dataList" :key="index"/>
        
        <section class="flex flex-justify-end list-page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="cp"
            :page-size="ps"
            layout="pager"
            :total="total"
            :background="true"
            >
          </el-pagination>
        </section> 
      </section>

      <section class="index-intros">
        <intro-container title="热门文章">
          <div class="index-bloger-cont index-bloger-arcs font gray6">
            <p class="text-ess-1 index-bloger-arc" v-for="(item,index) in hotList" :key="index">{{item.Title}}</p>
          </div>
        </intro-container >

        <intro-container title="推荐阅读">
          <div class="index-bloger-cont index-bloger-arcs font gray6">
            <p class="text-ess-1 index-bloger-arc" v-for="(item,index) in recommendList" :key="index">{{item.Title}}</p>
          </div>
        </intro-container>
      </section>
    </section>
  </section>
</template>

<script>
import introContainer from '~/components/introContainer'
import articleListItem from '~/components/articleListItem'
import { getArticleList } from '~/assets/service/articleService'
export default {
  data() {
    return {
      //热门文章列表
      hotList:[],

      //最新文章列表
      dataList:[],

      //推荐文章列表
      recommendList: [],

      keywords:'',
      cp: 1,
      ps: 10,
      total: 0
    }
  },
  components:{
    'intro-container':introContainer,
    'article-list-item':articleListItem,
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
          },
          {
            listName:'hotList',
            order:'ReadCount',
          },
          {
            listName:'recommendList',
            order:'CollectCount',
          },
      ];  

      let keywords = listName == 'dataList' ? this.keywords : '';
      let cp = listName == 'dataList' ? this.cp : 1;

      let { order } = orderBy.find(item => item.listName == listName);
      let { list , recordCount } = await getArticleList(this.ps,cp,keywords,order);

      this[listName] = list;
      this.total = listName == 'dataList' ? recordCount : this.total;

      if(listName == 'dataList')
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },

    //每次需要更新文章列表的时候，这是入口函数
    getSearchList() {
      let { query: { keywords }} = this.$route;
      this.keywords = keywords || '';
      this.cp = 1;
      this.getArticleList('dataList');
    },

    handleCurrentChange(val) {
      this.cp = val;
      this.getArticleList('dataList');
    }
  },

  created() {
    this.getSearchList();
    this.getArticleList('hotList');
    this.getArticleList('recommendList');
  },

  mounted() {
    
  },
  watch:{
    $route({ query: { keywords }}) {
      //表示地址栏搜索关键字改变了
      this.getSearchList();
    }
  }
}
</script>

<style scoped lang="less">

</style>
