<template>
  <div class="container">
    <div class="header">
      <div class="flex flex-align-end flex-justify-center logo-cont">
        <img class="logo" src="~assets/icon/logo.svg">
      </div>
      <div class="flex flex-align-center flex-justify-center gray3 logo-text">
        <span>Noven Blog 技术生涯经验分享</span> 
      </div>
    </div>
    
    <navMenu/>    

    <nuxt/>

    
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
            <el-tooltip class="item" effect="dark" content="a290079770" placement="top">
              <a href="https://github.com/a290079770" target="_blank">
                <span class="flex flex-align-center flex-justify-center footer-social-item">
                  <img class="footer-social-item-icon" src="~assets/icon/github.svg">
                </span>
              </a>
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

      <div class="flex flex-align-center flex-justify-center footer-copyright font">
        <span>Design by：Noven 唐青 </span>
        <a class="footer-copyright-ml" href="http://www.miitbeian.gov.cn/">备案号：蜀ICP备18035425号</a>
      </div>
    </div>
  </div>
</template>

<script>
  import navMenu from '@/components/navbar.vue'
  export default {
    components:{
      navMenu
    }
  }
</script>
