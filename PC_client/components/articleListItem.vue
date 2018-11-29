<template>
  <section  class="flex-center pr arc-list-item">
    <div class="flex-center arc-list-item-date-cont font-xs">
      <div class="arc-list-item-date-corner">
        
      </div>
      2018-11-28
    </div>

    <section class="flex flex-justify-between arc-list-item-cont">
      <section class="arc-list-item-cover" :style="{background: 'url(http://5b0988e595225.cdn.sohucs.com/images/20171208/1906e1bd2cb8412d9be3b12f42201fbe.jpeg) no-repeat center', backgroundSize:'cover' }">
        1
      </section>
      <section class="flex flex-justify-between flex-column arc-list-item-info-cont">
        <h2 class="font-lg text-ess-1">
          SEO常见的白帽优化技巧有哪些SEO常见的白帽优化技巧有哪些SEO常见的白帽优化技巧有哪些SEO常见的白帽优化技巧有哪些
        </h2>
        <p class="gray6 font text-ess-2 arc-list-item-abs" style="-webkit-box-orient: vertical">
          义的事总在思考一件有意义的事义的事总在思考一件有意义的事义的事总在思考一件有意义的事义的事总在思考一件有意义的事
        </p>
        <div class="flex flex-justify-between gray6 font">
          <div class="flex">
            <span class="flex flex-align-center arc-list-item-view-icon-cont ">
              <img class="arc-list-item-view-icon" src="~assets/icon/view.svg">
              <span>12234次浏览</span>
            </span>
            <span class="flex flex-align-center arc-list-item-view-icon-cont">
              <img class="arc-list-item-view-icon" src="~assets/icon/zan-kong.svg">
              <span>212次收藏</span>
            </span>
          </div>
          <div>
            <button @click="$router.push('/detail')" class="arc-list-item-btn font">立即阅读</button>
          </div>
        </div>
      </section>
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
  .arc-list-item {
    transition: @transition;
    margin-bottom: 20px;
    height: 180px;
    width: 100%;
    background: white;
    border-radius: @borderRadius;
    &:hover {
     .box-hover(); 
    };

    .arc-list-item-cont {
      width: 760px;
      height: 140px;
      .arc-list-item-cover {
        margin-right: 20px;
        width: 200px;
        height: 100%;
      }

      .arc-list-item-info-cont {
        width: 540px;
        height: 100%
      }

      .arc-list-item-abs {
        margin-top: 5px;
        -webkit-line-clamp: 3;
        line-height: 22px;
        height: 75px;
        line-height: 25px;
      }
      
      .arc-list-item-view-icon-cont {
        margin-right: 15px
      }

      .arc-list-item-view-icon {
        margin-right: 5px;
        width: 18px;
      }

      .arc-list-item-btn {
        width: 80px;
        height: 30px;
        border: none;
        outline: none;
        border-radius: 4px;
        background-color: @primary;
        color: white;
        cursor: pointer;
      }
    }

    .arc-list-item-date-cont {
      position: absolute;
      left: 20px;
      top: -10px;
      width: 75px;
      height: 25px;
      background: @primary;
      color: white;
      .arc-list-item-date-corner {
        position: absolute;
        left: -10px;
        top: 0px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 10px 10px;
        border-color: transparent transparent #c01e22 transparent;
      }
      &::before {
        content: '';
        position: absolute;
        left: -10px;
        top: 0px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 10px 10px;
        border-color: transparent transparent rgba(0,0,0,0.15) transparent;
      }
    }
  }
</style>