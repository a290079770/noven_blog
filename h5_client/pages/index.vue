<template>
  <section class="mc index">
    <!-- 轮播图 -->
    <section v-if="bannerList.length < 1" class="index-swiper bg-full-img index-swiper-skeleton"> </section>
    <section v-else class="index-swiper">
      <mt-swipe :auto="5000">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="item.id">
          <nuxt-link :to="{ name:'detail',query:{id : item.Id} }">
            <section class="flex-center index-swiper-item bg-full-img" :style="{background: `url(${ item.Url })`}">
              <div class="swiper-art-cont">
                <div class="flex flex-align-center flex-column swiper-art-center">
                  <div class="font-xs swiper-art-type">
                    @article
                  </div>
                  <div class="text-ess-1 font-lg gray3 swiper-art-title">
                    {{item.Title}}
                  </div>

                  <div class="text-ess-2 gray9 font-xs swiper-art-brief">
                    {{item.Brief || '博主很懒，没有留下简介信息，点击去看详情吧~~~'}}
                  </div>
                </div>
              </div>
            </section>
          </nuxt-link>
        </mt-swipe-item>
      </mt-swipe>
    </section>


    <!-- 热门文章 -->
    <section class="flex flex-justify-center flex-align-center index-title" >
      <img src="~assets/icon/hotarc.jpg" class="index-title-image full-img">
    </section>
    <div class="index-arc-list">
      <article-item :item="item" v-for="(item,index) in recommendList" :key="'hot'+index"/>
    </div>
    <p class="font index-link">
      <nuxt-link class="primary notapcolor" :to="{name:'list',query:{ index: 2}}">查看更多 >></nuxt-link>
    </p>


    <!-- 最新文章 -->
    <section class="flex flex-justify-center flex-align-center index-title" >
      <img src="~assets/icon/newest.png" class="index-title-image full-img">
    </section>
    <div class="index-arc-list">
      <article-item :item="item" v-for="(item,index) in dataList" :key="'new'+index"/>
    </div>
    <p class="font index-link">
      <nuxt-link class="primary notapcolor" :to="{name:'list',query:{ index: 0}}">查看更多 >></nuxt-link>
    </p>
  </section>
</template>

<script>
import { getArticleList } from '~/assets/service/articleService'
import ArticleItem from '~/components/articleItem'
export default {
  data() {
    return {
      dataList:[],
      bannerList:[],
      recommendList:[]
    }
  },

  components:{
    'article-item':ArticleItem
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
            order:'CollectCount',
            ps:5
          },
          {
            listName:'recommendList',
            order:'ReadCount',
            ps:10
          },
      ];

      let { order , ps } = orderBy.find(item => item.listName == listName);
      let { list } = await getArticleList(ps,1,'',order);
      this[listName] = list;
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
    this.getArticleList('dataList');
    this.getArticleList('bannerList');
    this.getArticleList('recommendList');
  },
  mounted() {
    //获取用户信息,如果有就显示
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
    }catch(e) {
      //没有用户信息的话用默认的
    }
  },
}
</script>
