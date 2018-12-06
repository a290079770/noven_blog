<template>
  <section class="pr intro-container">
    <div class="font-l intro-cont-title">
      {{title}}
    </div>
    <slot/>
  </section>
</template>

<script>

export default {
  props:{
    title:{
      type:String,
      default:'我的简介'
    }
  },
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
  
  .intro-container {
    transition: @transition;
    margin-bottom: 20px;
    height: auto;
    min-height: 80px;
    width: 100%;
    background: white;
    border-radius: @borderRadius;
    .intro-cont-title {
      margin-bottom: 5px;
      width: 100%;
      height: 40px;
      line-height: 55px;
      text-align: center;
      color: #000;
    }

    &:hover {
      .box-hover();
    }
  }
</style>