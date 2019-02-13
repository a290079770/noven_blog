<template>
  <div>
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
      <div class="article-brief font-xs gray9" v-if="detail.Brief">
         简介：{{detail.Brief}}
      </div>

      
      <!-- 封面 -->
      <div class="article-cover bg-full-img" :style="{background: `url(${ detail.Url })`}" v-if="detail.Url" >
      </div>

      
      <!-- 内容 -->
      <div class="gray6 article-content detail-content " v-html="detail.Content" >
        
      </div>

      <!-- 评论 -->
      <div class="flex-center article-zan">
        <div class="flex-center article-zan-cont" @click="addOrCancelCollection">
           <img :src="hasCollect ? '/zan-full.svg' : '/zan-kong.svg'" class="article-zan-icon">
           <span > {{detail.CollectCount}} </span>   
        </div>
      </div> 
      
      <section class="mc detail-author ">
        <section class="flex detail-author-cont">
          <figure class="detail-author-cover bg-full-img" :style="{background: `url(${authorInfo.CoverUrl})`}"> </figure>
          <section class="detail-author-info">
            <p>
              <span class="font-l">作者：</span>
              <span class="font-l primary">{{authorInfo.NickName}}</span>  
            </p>

            <p class="font-xs gray6 detail-author-abs">{{authorInfo.Introduction || '博主很懒，没有留下简介信息~~~'}}</p>
          </section>
        </section>
      </section>

      <feedback :type="2" :resourceId="id"/>


      <section 
      class="flex flex-align-center flex-justify-center add-article-cont"
      @click="addOrCancelCollection"
      >
        <img :src="hasCollect ? '/collect-full.svg' : '/collect-kong.svg'" class="add-article">
      </section>
    </div>
    <div class="article-detail-skeleton" v-else>
      <img class="article-img" src="/skeletonDetail.jpg">
    </div>
  </div>
</template>

<script>
import { getArticleDetail , collect } from '~/assets/service/articleService'
import { detailSimple } from '~/assets/service/userService'
import FeedBack from './feedback';
export default {
  head() {
    return {
      title:this.title
    }
  },
  data() {
    return {
      detail:null,
      authorInfo:{},
      id:null
    }
  },
  components:{
    'feedback':FeedBack
  },

  methods:{
    async getArticleDetail() {
      let res = await getArticleDetail(this.id);

      this.detail = res;  
      this.setPageTitle(res.Title);
      this.getSimpleDetail(res.AuthorId);
    },

    //获取作者基本信息
    async getSimpleDetail(id) {
      this.authorInfo = await detailSimple(id);
    },

    async addOrCancelCollection() {
      // 如果用户未登录，则跳转到登录页面
      if (!this.isLogin()) {
        this.goTo('/login');
        return;
      }

      //还没请求回数据
      if(!Object.keys(this.detail).includes('HasCollect')) return;

      let { HasCollect, Id } = this.detail;

      this.detail = await collect({
        id: Id,
        isCollect: !HasCollect
      });
    }
    
  },
  created() {
    let { id } = this.$route.query;
    if( !id ) {
      this.$message('文章id不能为空！');
      return 
    }

    this.id = + id;
  },
  mounted() {
    this.getArticleDetail();
  },
  computed: {
    hasCollect() {
      return this.detail.HasCollect;
    },

    title() {
      return this.detail && this.detail.Title ? this.detail.Title : 'Noven技术生涯经验分享'
    }
  }
}
</script>
