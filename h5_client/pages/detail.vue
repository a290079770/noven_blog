<template>
  <div class="article-detail-cont" v-if="detail">
     <div class="article-detail-title">
      {{detail.Title}}
     </div>

      <div class="flex flex-align-center flex-justify-between article-info">
        <div class="article-info-left">{{detail.Author}}  
          <span class="article-info-time"> {{detail.CreatTime}}</span>
        </div>  

        <div class="flex flex-align-center flex-justify-between article-info-numbercont">
          <div class="flex flex-align-center flex-justify-end article-info-zan">
            <img :src="hasCollect ? '/zan-full.svg' : '/zan-kong.svg'" class=" article-info-icon">
            <div class="article-info-number">
              {{detail.CollectCount}} 
            </div>
          </div>

          <div class="flex flex-align-center flex-justify-end article-info-zan">
            <img src="~assets/icon/view.svg" class=" article-info-icon">
            <div class="article-info-number">
              {{detail.ReadCount}}  
            </div>
          </div>
        </div>   
      </div>
      
      
      <!-- 简介 -->
      <div class="article-brief font gray9" v-if="detail.Brief">
         简介：{{detail.Brief}}
      </div>

      
      <!-- 封面 -->
      <div class="article-cover bg-full-img" :style="{background: `url(${ detail.Url })`}" v-if="detail.Url" >
      </div>

      
      <!-- 内容 -->
      <div class="gray6 font-l article-content detail-content " v-html="detail.Content" >
        
      </div>


      <div class="flex-center article-zan">
        <div class="flex-center article-zan-cont" @click="addOrCancelCollection">
           <img :src="hasCollect ? '/zan-full.svg' : '/zan-kong.svg'" class="article-zan-icon">
           <span > {{detail.CollectCount}} </span>   
        </div>
      </div> 
   </div>
</template>

<script>
import { getArticleDetail , collect } from '~/assets/service/articleService'
import { detailSimple } from '~/assets/service/userService'
export default {
  data() {
    return {
      detail:{
        Title:'Noven技术生涯经验分享'
      },
      authorInfo:{},
      id:null
    }
  },

  methods:{
    async getArticleDetail() {
      let res = await getArticleDetail(this.id);

      this.detail = res;  
      this.getSimpleDetail(res.AuthorId);
    },

    //获取作者基本信息
    async getSimpleDetail(id) {
      this.authorInfo = await detailSimple(id);
    },

    addOrCancelCollection() {}
    
  },
  created() {
    let { id } = this.$route.query;
    if( !id ) {
      this.$message('文章id不能为空！');
      return 
    }

    this.id = id;
    this.getArticleDetail();
  },
  mounted() {
    
  },
  computed: {
    hasCollect() {
      return true
    }
  }
}
</script>
