<template>
  <section class="flex flex-column flex-justify-end bg-full-img header">
    <div class="flex flex-align-center info font-l header-cont">
      <div v-if="isBackBtnShow" class="header-back-cont">
        <div class="flex flex-align-center">
          <img @click="$router.go(-1)" class="header-back-img" src="~assets/icon/back.svg">
          <span>|</span>
          <img @click="goTo('/','',true)" class="header-back-img" src="~assets/icon/index3.svg">
        </div>
      </div>
      <div class="text-ess-1">
        {{ pageTitle}}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:{
    pageTitle:{
      type:String,
      default:'Noven技术生涯经验分享'
    },
    isBackBtnShow: {
      type: Boolean,
      default: true
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
  mounted() {
    
  }
}
</script>

<style lang="less" scoped>
  @import '~assets/style/varite.less';

  .header {
    height: 1.62rem;
    width: 7.5rem;
    background: url('https://api.novenblog.xin/images/users/bg1_short.jpg');

    .header-cont {
      margin-left: 0.25rem;
      width: 6rem;
      height: 0.5rem;
      line-height: 0.5rem;

      .header-back-cont {
        display: inline-block;
        margin-right: 0.15rem;
        padding: 0 0.15rem;
        height: 0.5rem;
        background: rgba(118,143,195,0.5);
        color: white;
        border-radius: 0.25rem;

        .header-back-img {
          margin: 0 0.05rem;
          width: .4rem;
          height: .4rem;
        }
      }
    }
  }
</style>