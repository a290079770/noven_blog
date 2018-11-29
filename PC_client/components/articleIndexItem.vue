<template>
  <section @click="$router.push('/detail')" class="flex-center arc-index-item">
    <section class="flex flex-align-center flex-justify-between arc-index-item-cont">
      <div class="arc-index-item-cover" :style="{background: 'url(http://5b0988e595225.cdn.sohucs.com/images/20171208/1906e1bd2cb8412d9be3b12f42201fbe.jpeg) no-repeat center', backgroundSize:'cover' }">
        
      </div>
      <div class="arc-index-item-info-cont">
        <p class=" gray6 font-xs arc-index-item-info">
          <span class="primary">article&nbsp;</span>
          <span>@疯狂的麦克斯&nbsp;</span>
          <span class="gray9">2018-10-28</span>
        </p>
        <h2 class="arc-index-item-title text-ess-1">
          疯狂的麦克斯疯狂的麦克斯疯狂的麦克斯疯狂的麦克斯text-ess-1
        </h2>
        <p class="gray6 font text-ess-2 arc-index-item-abs" style="-webkit-box-orient: vertical">
          义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有思考一件有意义的事总在思考一件有意义的事总在义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在义的事总在思考一件有意义的事总在思考一件有意义的事总在思考一件有意义的事总在
        </p>
      </div>
    </section>
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
  .arc-index-item {
    transition: @transition;
    margin-top: 20px;
    height: 280px;
    width: 100%;
    background: white;
    border-radius: @borderRadius;
    &:hover {
     .box-hover(); 
    };

    .arc-index-item-cont {
      width: 700px;
      height: 205px;
      .arc-index-item-cover {
        margin-right: 25px;
        width: 365px;
        height: 100%;
      }

      .arc-index-item-info-cont {
        height: 100%;
        width: 375px;
        .arc-index-item-info {
          height: 34px;
          line-height: 34px;
        }

        .arc-index-item-title {
          font-size: 20px;
          height: 50px;
          line-height: 30px;
        }

        .arc-index-item-abs {
          -webkit-line-clamp: 5;
          line-height: 22px;
        }
      }
    }
  }
</style>