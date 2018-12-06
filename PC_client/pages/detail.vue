<template>
  <section class="detail">
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
              <i class="font-xs">{{detail.CollectCount}}次收藏</i>
            </i>
          </i>
        </p>

        <figure class="detail-cover">
          <img :src="detail.Url" class="detail-cover-img">
        </figure>

        <article class="font gray6 detail-content" v-html="detail.Content"></article>

      </section>
    </section>
    <!-- <section class="mc detail-author ">
      <section class="flex detail-author-cont">
        <figure class="detail-author-cover bg-full-img" :style="{background: 'url(http://5b0988e595225.cdn.sohucs.com/images/20171208/1906e1bd2cb8412d9be3b12f42201fbe.jpeg)'}"> </figure>
        <section class="detail-author-info">
          <p>
            <span class="font-l">作者：</span>
            <span class="font-l primary">Noven</span>  
          </p>

          <p class="font detail-author-abs">这是一段作者简介这是一段作者简介这是一段作者简介这是一段作者简介这是一段作者简介这是一段作者简介这是一段作者简介这是一段作者简介这是一段作者简介这是一段作者简介这是一段</p>
        </section>
      </section>
    </section> -->

<!--     <section class="mc detail-author ">
      <section class="flex-center detail-author-cont">
        点赞
      </section>
    </section> -->
  </section>
</template>

<script>
import {getArticleDetail} from '~/assets/service/articleService'
export default {
  data() {
    return {
      detail:{}
    }
  },

  methods:{
    async getArticleDetail() {
      let res = await getArticleDetail(this.id);

      res.CreateTime = this.dateFormat(res.CreateTime,'yyyy-mm-dd')
      this.detail = res;  
    }
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
    
  }
}
</script>
