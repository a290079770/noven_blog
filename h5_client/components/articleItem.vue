<template>
   <nuxt-link :to="{ name:'detail',query:{id : item.Id} }">
     <div class="arc-item" >
        <div class="flex flex-justify-between arc-item-cont">
          <figure class="arc-item-cover bg-full-img" :style="{background: `url(${ item.Url })`}"></figure>
          <div class="flex flex-column flex-justify-between arc-item-abs">
            <div class="flex flex-align-center art-li-title">
              <span class="art-li-title-yuanchuang"> 原创 </span>
              <span class="flex-1 text-ess-1 font-l"> {{item.Title}}</span>        
            </div>
            <div v-if="true" class="art-li-brief font-xs gray9 text-ess-2">
              {{item.Brief || '博主很懒，没有留下简介信息，点击去看详情吧~~~'}}
            </div>

            <div class="flex flex-align-center flex-justify-between art-li-info font-xs">
              <div class="flex flex-align-center">
                <div class="font-xs gray9">
                  <span class="primary">@</span>
                  <span class="info">{{item.Author}}</span>
                </div>
                
              </div>
              <div class="flex flex-align-center font-l gray9">
                <div class="flex flex-align-center flex-justify-end article-info-zan">
                  <img src="~assets/icon/zan-kong.svg" class=" article-info-icon">
                  <div class="font info">
                    {{item.CollectCount}}
                  </div>
                </div>

                <div class="flex flex-align-center flex-justify-end article-info-zan">
                  <img src="~assets/icon/view.svg" class=" article-info-icon">
                  <div class="font primary">
                    {{item.ReadCount}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   </nuxt-link>
</template>
<script>
export default {
  props:{
    item: {
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
       
    }
  },
  methods:{
    
  },
  created() {
    
  },

  watch:{

  }
}

</script>

<style lang="less" scoped>
  @import '~assets/style/varite.less';
  .arc-item {
     height: 2.4rem;
     overflow: hidden;
     border-bottom: @borderBold;
     .arc-item-cont {
       margin-top: .3rem;
       height: 2rem;

       .arc-item-cover {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: @borderRadius;
       }

       .arc-item-abs {
        width: 5rem;
        height: 1.8rem;

        .art-li-title {
        height: .6rem;
        width: 100%;
      }

      .art-li-title-yuanchuang {
        margin-right: .12rem;
        padding: 0 .08rem;
        font-size: .2rem;
        color: @primary;
        box-sizing: border-box;
        border: .02rem solid @primary;
        border-radius: .08rem;
      }

      .art-li-brief {
         height: .74rem;
         line-height: .37rem;
      }


      .art-li-info {
        height: .48rem;
        width: 100%;
      }


      .article-info-icon {
        margin-right:.06rem;
        width: .28rem;
        height: .28rem;
      }

      .article-info-zan {
        margin-right: .2rem;
      }

      .art-li-info-createtime {
        margin-left: .2rem;
        font-style: italic;
        height: 100%;
      }

      .article-li-item-skeleton {
        width: 6.80rem;
        height: 4.32rem;
      }
       }
     }
  }
</style>

