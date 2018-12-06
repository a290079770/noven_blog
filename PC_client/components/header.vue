<template>
  <div class="header">
    <div class="flex flex-align-end flex-justify-center mc logo-cont">
      <img class="logo" src="~assets/icon/logo.svg" @click="$router.push('/')">
    </div>
    <div class="flex flex-align-center flex-justify-center gray3 mc logo-text">
      <span>Noven Blog 技术生涯经验分享</span> 
    </div>
  </div>
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
  @import '~assets/style/varite.less';
  
  .header {
    height: 175px;
    width: 100%;
    border-bottom: @borderBold;
    overflow: hidden;
  }

  .logo-cont {
    width: @pageWidth;
    margin-top: 8px;
    height: 105px;
  }

  .logo {
    width: 108px;
  }

  .logo-text-img {
    width: 120px;
  }

  .logo-text {
    width: @pageWidth;
    height: 54px;
    font-size: 22px;
  }
</style>