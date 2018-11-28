<template>
  <div class="flex-center  pr index-top-black" :style="{width:winWidth + 'px', height: winHeight + 'px'}">
    <img class="index-top-black-logo" src="~assets/icon/blog_logo.png" />
    <div class="flex-center pr font-lg index-top-black-center">
      <h2 class="index-top-black-center-text">
        Noven Blog
      </h2>
    </div>

    <div class="flex-center index-top-black-scroll">
      <div class="flex flex-justify-end index-top-black-scroll-cont">
        <div class="index-top-black-scroll-box" @click="scrollToView">
          <img class="index-top-black-scroll-box-icon" src="~assets/icon/down.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    }
  },

  methods:{
    scrollToView() {
      window.scrollTo({
        top: this.winHeight,
        behavior: "smooth"
      })
    }
  },
  created() {
    
  },
  mounted() {
    window.onresize = () => {
      this.winWidth = window.innerWidth
      this.winHeight = window.innerHeight
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~assets/style/common.less';
  
  .index-top-black {
    min-width: @pageWidth;
    background: url(~static/login_bg.jpg);
    background-position: 100% 0;
    background-size: cover;
    overflow: hidden;
    color: white;
    .index-top-black-logo {
      position: absolute;
      left: 100px;
      top: 50px;
      width: 200px;
    }

    .index-top-black-center {
      margin-top: -100px;
      width: 200px;
      height: 100px;
      overflow: hidden;

      .index-top-black-center-text {
        font-size: 34px;
        font-family: 'Times New Roman',SimSun, sans-serif;
        animation: leftRight 1.5s ease;
      }

      &::before {
        position: absolute;
        left: 0%;
        top: 0;
        content: '';
        display: block;
        width: 100%;
        background: white;
        height: 2px;
        animation: centerBefore 1.5s ease;
      }

      &::after {
        position: absolute;
        right: 0%;
        bottom: 0;
        content: '';
        display: block;
        width: 100%;
        background: white;
        height: 2px;
        animation: centerAfter 1.5s ease;
      }

      @keyframes leftRight {
        40% {
          transform: scale(.7);
          opacity: 1;
          color: #fff;
        }
        60% {
          color: #fff;
        }
        80% {
          transform: scale(1.2);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes centerBefore {
        from { left: -100%; }
        to { left: 0%; }
      }

      @keyframes centerAfter {
        from { right: -100%; }
        to { right: 0%; }
      }
    }

    .index-top-black-scroll {
      position: absolute;
      bottom: 15px;
      z-index: 2;
      width: 100%;
      height: 60px;

      .index-top-black-scroll-cont {
        width: @pageWidth;
        height: 100%;
        
        .index-top-black-scroll-box {
          width: 60px;
          height: 100%;
          cursor: pointer;
          .index-top-black-scroll-box-icon {
            width: 40px;
            height: 40px;
            animation: downAnimate 1.5s linear infinite;
          }

          @keyframes downAnimate {
            0% {transform: translateY(0px)}
            25% {transform: translateY(20px)}
            50% {transform: translateY(0px)}
            75% {transform: translateY(-20px)}
            100% {transform: translateY(0px)}
          }
        }
      }
    }
  }
</style>