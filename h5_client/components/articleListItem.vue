<template>
  <nuxt-link class="arc-list-item" :to="{ name:'detail',query:{id : item.Id} }">
   <div class=" my-list-item-cont">
     <div class="flex flex-align-center flex-justify-between my-list-item">
       <div class="flex flex-align-center my-list-item-cont-left">
         <div class="flex flex-column flex-justify-around my-list-arc">
           <div class="font text-ess-2 my-list-arc-title">
            {{item.Title}}
           </div>
           <div class="flex flex-justify-between font-xs text-ess-1 my-list-arc-date gray9">
            <span>
              {{item.CreateTime}}
            </span>

            <div class="flex flex-align-center font-l gray9">
              <div class="flex flex-align-center flex-justify-end article-info-zan">
                <img src="~assets/icon/zan-kong.svg" class=" article-info-icon">
                <div class="font-xs info">
                  {{item.CollectCount}}
                </div>
              </div>

              <div class="flex flex-align-center flex-justify-end article-info-zan">
                <img src="~assets/icon/view.svg" class=" article-info-icon">
                <div class="font-xs primary">
                  {{item.ReadCount}}
                </div>
              </div>
            </div>
           </div>
         </div>
       </div>
       <div class="my-list-arc-cover-cont bg-full-img" :style="{background: `url(${ item.Url })`}">
         
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
  .arc-list-item {
    .my-list-item-cont {
      height: 1.8rem;
      border-bottom: 1px solid #ddd;
    }

    .my-list-item {
      padding:0.2rem;
    }

    .my-list-item-cont-left {
      height: 100%;
    }


    .my-list-arc {
      flex-direction: column;
      width: 4.6rem;
      height: 1.4rem;
    }

    .my-list-arc-title {
      width: 100%;
      color:#333;
    }

    .my-list-arc-date {
      margin: .10rem 0 0;
      width: 100%;
    }

    .my-list-arc-cover-cont {
      width: 1.80rem;
      height: 1.40rem;
    }

    .my-list-arc-cover {
      width: 100%;
      height: 100%;
    }

    .article-info-icon {
      margin-right:.06rem;
      width: .24rem;
      height: .24rem;
    }

    .article-info-zan {
      margin-right: .2rem;
    }

    .art-li-info-createtime {
      margin-left: .2rem;
      font-style: italic;
      height: 100%;
    }
  }
  
</style>

