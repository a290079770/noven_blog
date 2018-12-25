<template>
  <div>
    <div class="footer-place"></div>
    <div class="footer">
      <div class="flex flex-align-center flex-justify-between font footer-cont">
        <div class="footer-item">
          <h4 class="font-lg footer-title">Noven Blog 简介</h4>
          <div>
            Noven Blog 是一个方便记录博客、文章、心情的涵盖大部分平台的系统，由个人开发维护。
          </div>
          <div>
            如果您在使用的过程中遇到问题或有更好的建议，欢迎联系作者qq 290079770 或者电子邮箱 290079770@qq.com。
          </div>
        </div>
        <div class="footer-item">
          <h4 class="font-lg footer-title">社交账号</h4>
          <div class="flex flex-align-center">
            <el-tooltip class="item" effect="dark" content="290079770" placement="top">
              <span class="flex flex-align-center flex-justify-center footer-social-item">
                <img class="footer-social-item-icon" src="~assets/icon/qq.svg">
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="https://github.com/a290079770" placement="top">
              <!-- <a href="https://github.com/a290079770" target="_blank"> -->
                <span class="flex flex-align-center flex-justify-center footer-social-item">
                  <img class="footer-social-item-icon" src="~assets/icon/github.svg">
                </span>
              <!-- </a> -->
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="yuzhichen832037" placement="top">
              <span class="flex flex-align-center flex-justify-center footer-social-item">
                <img class="footer-social-item-icon" src="~assets/icon/wechat.svg">
              </span>
            </el-tooltip>
          </div>  
          <h4 class="font-lg footer-title footer-credits">Credits</h4>
          <div class="footer-credits-text">
            夫志当存高远，慕先贤，绝情欲，弃疑滞，使庶几之志，揭然有所存，恻然有所感;忍屈伸，去细碎，广咨问，除嫌吝，虽有淹留，何损于美趣，何患于不济。若志不强毅，意不慷慨，徒碌碌滞于俗，默默束于情，永窜伏于平庸，不免于下流矣。——诸葛亮
          </div>
        </div>
        <div class="footer-item">
          <h4 class="font-lg footer-title">巨人的肩膀</h4>
          <div>
            <b>Heroes</b>
          </div>  
          <ul class="footer-heroes-item">
            <a href="https://cn.vuejs.org/"><li>Vue.js</li></a>
            <a href="https://zh.nuxtjs.org/"><li>Nuxt.js</li></a>
            <a href="http://www.php.net/"><li>PHP</li></a>
            <a href="http://lesscss.cn/"><li>Less</li></a>
            <a href="http://element.eleme.io/"><li>Element UI</li></a>
            <li>...</li>
          </ul> 
        </div>
      </div>

      <!-- <div class="flex flex-align-center flex-justify-center footer-copyright font">
        <span>Design by：Noven 唐青 </span>
        <a class="footer-copyright-ml" href="http://www.miitbeian.gov.cn/">备案号：蜀ICP备18035425号</a>
      </div> -->
      <div class="flex flex-align-center flex-justify-center footer-copyright font">
          <span>Design by：Noven 唐青 </span>
          <a class="footer-copyright-ml" href="http://www.miitbeian.gov.cn/">备案号：蜀ICP备18035425号</a>

          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51012402000350" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;margin-left: 10px;">
            <img src="https://api.novenblog.xin/images/beian.png" style="float:left;">
            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">川公网安备 51012402000350号</p>
          </a>
        </div>
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
  
  .footer-place {
    height: 520px;
  }

  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 420px;
    width: 100%;
    color: white;
    background: black;
  }

  .footer-cont {
    margin: 0 auto;
    width: 1150px;
    height: 100%;
    line-height: 30px;
  }

  .footer-item {
    margin-right: 40px;
    width: 375px;
    height: 270px;
  }

  .footer-title {
    margin-bottom: 10px;
  }

  .footer-social-item {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border: 1px solid white;
    cursor: pointer;
  }

  .footer-social-item-icon {
    width: 20px;
  }

  .footer-credits {
    margin-top: 20px;
  }

  .footer-credits-text {
    line-height: 24px;
  }


  .footer-heroes-item {
    margin-top: 10px;
    margin-left: 35px;
    a {
      color:white;
      text-decoration: none;
    }
  }

  .footer-copyright {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    height: 30px;
    color: #939393;
  }

  .footer-copyright-ml {
    color: #939393;
    margin-left: 10px;
  }
</style>