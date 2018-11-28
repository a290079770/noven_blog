<template>
  <section class="mc index">
    <section style="height: 30px"> </section>
    <section class="index-swiper">
      <el-carousel 
      :interval="0" 
      height="505px"
      trigger="click"
      >
        <el-carousel-item v-for="(item,index) in bannerList" :key="'banner'+index">
          <section :style="{background: 'url('+ item.Url +') no-repeat center', backgroundSize:'cover' }" class="flex-center index-swiper-item">
            <section class="flex-center flex-column index-swiper-detail-cont">
              <section class="index-swiper-detail-author font">
                @article
              </section>
              <h2 class="index-swiper-detail-title">
                总在思考一件有意义的事
              </h2>
              <p class="font gray6 text-ess-3 index-swiper-detail-abs" style="-webkit-box-orient: vertical">
                总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事
              </p>
              <p class="font gray9">
                2018-10-28
              </p>
            </section>
          </section>
        </el-carousel-item>
      </el-carousel>
    </section>

    <section class="flex flex-justify-between index-body">
      <section class="index-list"> 
        <section class="index-list-item-first" >
          <div class="index-list-item-first-cover" :style="{background: 'url(http://5b0988e595225.cdn.sohucs.com/images/20171208/1906e1bd2cb8412d9be3b12f42201fbe.jpeg) no-repeat center', backgroundSize:'cover' }"></div>
          <div class="index-list-item-first-info-cont">
            <p class="index-list-item-first-info gray6 font-xs">
              <span class="primary">article&nbsp;</span>
              <span>@疯狂的麦克斯&nbsp;</span>
              <span class="gray9">2018-10-28</span>
            </p>
            <h2 class="index-list-item-first-title text-ess-1">
              总在思考一件有意义的事总在思考一件有意义的事总在
            </h2>
            <p class="gray6 font text-ess-2" style="-webkit-box-orient: vertical">
              义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在
            </p>
          </div>
        </section>

        <article-index-item v-for="(item,index) in 5" :key="index"/>
      </section>

      <section class="index-intros">
        <intro-container>
          <div class="index-bloger-cont">
            <figure class="index-bloger-cover" :style="{background: 'url(http://5b0988e595225.cdn.sohucs.com/images/20171208/1906e1bd2cb8412d9be3b12f42201fbe.jpeg) no-repeat center', backgroundSize:'cover' }"></figure>
            <h3 class="flex-center font-l index-bloger-name " >
              义的事总义的事总
            </h3>
            <p class="gray6 font">
              一件有意义的事总在思考一件有意义的事总在义的事总在思考一件有意义的事总在思考一件有意义的
            </p>
          </div>
        </intro-container>

        <intro-container>
          <div class="flex-center index-bloger-contact">
            <el-tooltip class="item" effect="dark" content="290079770" placement="top">
              <span class="flex flex-align-center flex-justify-center index-bloger-social-item">
                <img class="index-bloger-social-item-icon" src="~assets/icon/qq-gray.svg">
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="a290079770" placement="top">
              <a href="https://github.com/a290079770" target="_blank">
                <span class="flex flex-align-center flex-justify-center index-bloger-social-item">
                  <img class="index-bloger-social-item-icon" src="~assets/icon/github-gray.svg">
                </span>
              </a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="yuzhichen832037" placement="top">
              <span class="flex flex-align-center flex-justify-center index-bloger-social-item">
                <img class="index-bloger-social-item-icon" src="~assets/icon/wechat-gray.svg">
              </span>
            </el-tooltip>
          </div> 
        </intro-container>

        <intro-container>
          <div class="index-bloger-cont gray6 font">
            <div class="index-bloger-motto-seperator"></div>
            <p>积一时之跬步，臻千里之遥程</p>
            <div class="index-bloger-motto-seperator"></div>
            <p>积一时之跬步，臻千里之遥程积一时之跬步，臻千里之遥程积一时之跬步，臻千里之遥程</p>
            <div class="index-bloger-motto-seperator"></div>
            <p>积一时之跬步，臻千里之遥程积一时之跬步，臻千里之遥程积一时之跬步，臻千里之遥程积一时之跬步，臻千里之遥程积一时之跬步，臻千里之遥程积一时之跬步，臻千里之遥程</p>
            <div class="index-bloger-motto-seperator"></div>
            <p>积一时之跬步，臻千里之遥程积一时之跬步，臻千里之遥程</p>
            <div class="index-bloger-motto-seperator"></div>
          </div>
        </intro-container>

        <intro-container>
          <div class="index-bloger-cont index-bloger-arcs font gray6">
            <p class="text-ess-1 index-bloger-arc" v-for="(item,index) in 10" :key="index">意义的事总在义的事总在思考一件有意义的事意义的事总在义的事总在思考一件有意义的事</p>
          </div>
        </intro-container>
      </section>
    </section>
  </section>
</template>

<script>
import ArticleIndexItem from '~/components/articleIndexItem'
import introContainer from '~/components/introContainer'
export default {
  data() {
    return {
      
      bannerList:[
        {
          title:'xxx',
          Url:'http://5b0988e595225.cdn.sohucs.com/images/20171208/1906e1bd2cb8412d9be3b12f42201fbe.jpeg'
        },
        {
          title:'xxx',
          Url:'http://5b0988e595225.cdn.sohucs.com/images/20171208/1906e1bd2cb8412d9be3b12f42201fbe.jpeg'
        },
        {
          title:'xxx',
          Url:'http://5b0988e595225.cdn.sohucs.com/images/20171208/1906e1bd2cb8412d9be3b12f42201fbe.jpeg'
        },
        {
          title:'xxx',
          Url:'http://5b0988e595225.cdn.sohucs.com/images/20171208/1906e1bd2cb8412d9be3b12f42201fbe.jpeg'
        },
        {
          title:'xxx',
          Url:'http://5b0988e595225.cdn.sohucs.com/images/20171208/1906e1bd2cb8412d9be3b12f42201fbe.jpeg'
        },

      ]
    }
  },

  components:{
    'article-index-item':ArticleIndexItem,
    'intro-container':introContainer,
  },

  methods:{

  },
  created() {
    // this.$http.get('/arcticle/arcticleList',{
    //   params:{
    //     b:2
    //   }
    // }).then((res) => {
    //   console.log(res.data);
    // })
  },
  mounted() {
  }
}
</script>
