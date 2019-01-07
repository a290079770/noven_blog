<template>
  <section class="pr detail">
    <section>&nbsp;</section>
    <section class="mc detail-main">
      <section class="detail-cont">
        <h1 class="flex-center detail-title">
          {{detail.Title}}
        </h1>

        <p class="pr flex-center detail-info font gray9">
          <span class="primary">@article</span>
          <span class="font-lg info">{{detail.Author}}</span>
          <span>{{detail.CreateTime}}</span>
          <i class="flex detail-info-view">
            <i class="flex flex-align-center arc-list-item-view-icon-cont ">
              <img class="arc-list-item-view-icon" src="~assets/icon/view.svg">
              <i class="font-xs">{{detail.ReadCount}}次浏览</i>
            </i>
            <i class="flex flex-align-center arc-list-item-view-icon-cont">
              <img class="arc-list-item-view-icon" src="~assets/icon/zan-kong.svg">
              <i class="font-xs">{{detail.CollectCount}}次点赞</i>
            </i>
          </i>
        </p>

        <figure class="detail-cover">
          <img :src="detail.Url" class="detail-cover-img">
        </figure>

        <article class="font gray6 detail-content" v-html="detail.Content"></article>

      </section>
    </section>
    <section class="mc detail-author ">
      <section class="flex detail-author-cont">
        <figure class="detail-author-cover bg-full-img" :style="{background: `url(${authorInfo.CoverUrl})`}"> </figure>
        <section class="detail-author-info">
          <p>
            <span class="font-l">作者：</span>
            <span class="font-l primary">{{authorInfo.NickName}}</span>  
          </p>

          <p class="font detail-author-abs">{{authorInfo.Introduction || '博主很懒，没有留下简介信息~~~'}}</p>
        </section>
      </section>
    </section>

    <feedback :type="2" :resourceId="id"/>
    
    <section @click="collect" class="flex-center detail-collect-cont">
      <img class="detail-collect" :src="hasCollect">
    </section>
  </section>
</template>

<script>

import { getArticleDetail , collect } from '~/assets/service/articleService'
import { detailSimple } from '~/assets/service/userService'
import FeedBack from './feedback';
export default {
  components:{
    'feedback':FeedBack
  },

  data() {
    return {
      detail:{
        Title:'Noven技术生涯经验分享'
      },
      authorInfo:{},
      id:null
    }
  },

  head() {
    return {
      title:this.detail.Title
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

    // 收藏
    async collect() {
      // 如果用户未登录，则跳转到登录页面
      if (!this.isLogin) {
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
    },
  },
  created() {
    let { id } = this.$route.query;
    if( !id ) {
      this.$message.error('文章id不能为空！');
      return 
    }

    this.id = id;
    this.getArticleDetail();
  },
  mounted() {
  },

  computed: {
    hasCollect() {
      return this.detail.HasCollect ? '/zan-full.svg' : '/zan-kong-white.svg';
    },

    isLogin() {
      return this.getCookie('token');
    }
  }
}
</script>
