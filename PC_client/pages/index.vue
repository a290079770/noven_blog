<template>
  <section class="mc index">
    <section style="height: 40px"> </section>
    <section class="index-swiper">
      <el-carousel 
      :interval="0" 
      height="505px"
      trigger="click"
      >
        <el-carousel-item v-for="(item,index) in bannerList" :key="'banner'+index"  >
          <nuxt-link :to="{ name:'detail',query:{id : item.Id} }">
            <section :style="{background: 'url('+ item.Url +')' }" class="flex-center index-swiper-item bg-full-img">
              <section class="flex-center flex-column index-swiper-detail-cont">
                <section class="index-swiper-detail-author font">
                  @article
                </section>
                <h2 class="index-swiper-detail-title">
                  {{item.Title}}
                </h2>
                <p class="font gray6 text-ess-3 index-swiper-detail-abs" style="-webkit-box-orient: vertical">
                  {{item.Brief || '博主很懒，没有留下简介信息，点击去看详情吧~~~'}}
                </p>
                <p class="font gray9">
                  {{item.CreateTime}}
                </p>
              </section>
            </section>
          </nuxt-link>
        </el-carousel-item>
      </el-carousel>
    </section>

    <section class="flex flex-justify-between index-body">
      <section class="index-list" > 
        <nuxt-link v-if="firstArc" :to="{ name:'detail',query:{id : firstArc.Id} }">
          <section class="index-list-item-first" >
            <div class="index-list-item-first-cover bg-full-img" :style="{background: `url(${firstArc.Url})`}"></div>
            <div class="index-list-item-first-info-cont">
              <p class="index-list-item-first-info gray6 font-xs">
                <span class="primary">article&nbsp;</span>
                <span>@{{firstArc.Author}}&nbsp;</span>
                <span class="gray9">{{firstArc.CreateTime}}</span>
              </p>
              <h2 class="index-list-item-first-title text-ess-1">
                {{firstArc.Title}}
              </h2>
              <p class="gray6 font text-ess-2" style="-webkit-box-orient: vertical">
                {{firstArc.Brief || '博主很懒，没有留下简介信息，点击去看详情吧~~~'}}
              </p>
            </div>
          </section>
        </nuxt-link>

        <article-index-item :item="item" v-for="(item,index) in dataList.slice(1)" :key="index"/>
      </section>

      <section class="index-intros">
        <intro-container :title=" isLogin ? '欢迎您' : '关于我'">
          <div class="index-bloger-cont">
            <figure class="index-bloger-cover">
              <img class="index-bloger-cover-img" :src="userInfo.CoverUrl">
            </figure>
            <h3 class="flex-center font-lg primary index-bloger-name " >
              {{userInfo.NickName}}
            </h3>
            <p class="gray6 font">
              {{userInfo.Introduction || '我还没有留下简介信息～'}}
            </p>
          </div>
        </intro-container>

        <intro-container title="联系方式（Noven）">
          <div class="flex-center index-bloger-contact">
            <el-tooltip class="item" effect="dark" content="290079770" placement="top">
              <span class="flex flex-align-center flex-justify-center index-bloger-social-item">
                <img class="index-bloger-social-item-icon" src="~assets/icon/qq-gray.svg">
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="https://github.com/a290079770" placement="top">
              <!-- <a href="https://github.com/a290079770" target="_blank"> -->
                <span class="flex flex-align-center flex-justify-center index-bloger-social-item">
                  <img class="index-bloger-social-item-icon" src="~assets/icon/github-gray.svg">
                </span>
              <!-- </a> -->
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="yuzhichen832037" placement="top">
              <span class="flex flex-align-center flex-justify-center index-bloger-social-item">
                <img class="index-bloger-social-item-icon" src="~assets/icon/wechat-gray.svg">
              </span>
            </el-tooltip>
          </div> 
        </intro-container>

        <intro-container title="座右铭">
          <div class="index-bloger-cont gray6 font">
            <div class="index-bloger-motto-seperator"></div>
            <p>积一时之跬步，臻千里之遥程。</p>
            <div class="index-bloger-motto-seperator"></div>
            <p>生命不息，奋斗不止。</p>
            <div class="index-bloger-motto-seperator"></div>
            <p>人类的希望像是一颗永恒的星，乌云掩不住它的光芒。个性是在今日，和平不是一个理想，一个梦，它是万人的愿望。</p>
            <div class="index-bloger-motto-seperator"></div>
            <p>天行健，君子以自强不息。</p>
            <div class="index-bloger-motto-seperator"></div>
          </div>
        </intro-container>

        <intro-container title="推荐阅读">
          <div class="index-bloger-cont index-bloger-arcs font gray6">
            <nuxt-link v-for="(item,index) in recommendList" :key="index" :to="{ name:'detail',query:{id : item.Id} }">
              <p class="text-ess-1 index-bloger-arc" >{{item.Title}}</p>
            </nuxt-link>
          </div>
        </intro-container>
      </section>
    </section>
  </section>
</template>

<script>

import ArticleIndexItem from '~/components/articleIndexItem'
import introContainer from '~/components/introContainer'
import { getArticleList } from '~/assets/service/articleService'
export default {
  data() {
    return {
      //首页banner图列表
      bannerList:[
      ],

      //首页文章列表
      dataList:[],

      //推荐阅读文章列表
      recommendList: [],

      userInfo: {
        CoverUrl:'/intro2.jpeg',
        // CoverUrl:'https://api.novenblog.xin/images/Yve4jIf6KHG3dz63_photo_1544078309.jpeg',
        NickName:'Noven',
        Introduction:'关于Noven Blog，是一个个人文章分享类网站，由唐青和小林共同开发^_^，目前已上线PC、H5、微信小程序～'
      }
    }
  },

  components:{
    'article-index-item':ArticleIndexItem,
    'intro-container':introContainer,
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
    firstArc() {
      return this.dataList[0]
    },
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
