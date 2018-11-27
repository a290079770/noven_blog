<template>
  <section class="pr intro-container">
    <div class="flex-center intro-cont-title">
      <b class="font-l intro-cont-title-text">我的简介</b>
    </div>
    <div class="intro-cont-title-place"></div>
    <slot/>
  </section>
</template>

<script>

export default {
  data() {
    return {
      
    }
  },

  methods:{},
  created() {
    
  },
  mounted() {
    
  }
}
</script>

<style lang="less" scoped>
  @import '~assets/style/common.less';
  
  .intro-container {
    margin-bottom: 40px;
    height: auto;
    min-height: 80px;
    width: 100%;
    border: @borderBold;
    .intro-cont-title {
      position: absolute;
      left: 0;
      top: -17px;
      width: 100%;
      height: 34px;
      .intro-cont-title-text {
        padding: 0 15px;
        background: url(~assets/icon/body_bg.png);
      }
    }
    .intro-cont-title-place {
      height: 17px;
    }
  }
</style>