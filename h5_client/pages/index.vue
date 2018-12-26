<template>
  <section class="mc index">
    <!-- 轮播图 -->
    <section v-if="true" class="index-swiper bg-full-img index-swiper-skeleton"> </section>
    <section v-else class="index-swiper">
      <mt-swipe :auto="5000">
        <mt-swipe-item v-for="(item,index) in 4">
          <section class="index-swiper-item bg-full-img" :style="{background: `url(${ '/banner-skeleton.jpg' })`}">
            
          </section>
        </mt-swipe-item>
      </mt-swipe>
    </section>


    <!-- 热门文章 -->
    <section class="flex flex-justify-center flex-align-center index-title" >
      <img src="~assets/icon/hotarc.jpg" class="index-title-image full-img">
    </section>
    <ul class="index-arc-list">
      <li class="arc-item" v-for="item in 3">
        <div class="flex flex-justify-between arc-item-cont">
          <figure class="arc-item-cover"></figure>
          <div class="arc-item-abs">
            <div class="flex flex-align-center art-li-title">
              <span class="art-li-title-yuanchuang"> 原创 </span>
              <span class="flex-1 text-ess-1 font-l"> 这是标题这是标题这是标题</span>        
            </div>
            <div v-if="true" class="art-li-brief font-xs gray9 text-ess-2">
              这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介
            </div>

            <div class="flex flex-align-center flex-justify-between art-li-info font-xs">
              <div class="flex flex-align-center">
                <div class="font gray9">
                  <span class="primary">@</span>
                  <span class="info">这是作者</span>
                </div>
                
              </div>
              <div class="flex flex-align-center font-l gray9">
                <div class="flex flex-align-center flex-justify-end article-info-zan">
                  <img src="~assets/icon/zan-kong.svg" class=" article-info-icon">
                  <div class="font info">
                    18
                  </div>
                </div>

                <div class="flex flex-align-center flex-justify-end article-info-zan">
                  <img src="~assets/icon/view.svg" class=" article-info-icon">
                  <div class="font primary">
                    32
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { getArticleList } from '~/assets/service/articleService'
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      
    }
  },

  methods:{
    a() {
      Toast('hellow')
    },
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
    //获取用户信息,如果有就显示
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
    }catch(e) {
      //没有用户信息的话用默认的
    }

    this.getArticleList('dataList');
    this.getArticleList('bannerList');
    this.getArticleList('recommendList');
  },
  mounted() {
    
  },
}
</script>
