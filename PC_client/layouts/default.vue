<template>
  <div class="container">
    <index-top v-if="isShowIndexTop"/>
    <div class="container-body">
      <main-header/>
      
      <nav-menu/>    

      <nuxt/>

      <main-footer/>
    </div>

    <div class="particles-container" id="particles-js"></div>
  </div>
</template>

<script>
  import navMenu from '@/components/navbar'
  import indexTop from '@/components/indexTop'
  import header from '@/components/header'
  import footer from '@/components/footer'

  export default {
    data() {
      return {
      }
    },
    components:{
      'nav-menu':navMenu,
      'index-top':indexTop,
      'main-header':header,
      'main-footer':footer,
    },

    methods: {
      addPurple() {
        document.onclick = function(e) {
          //每次点击新增一个气球
          var qiqiu = document.createElement('i');
          
          //给气球加初始样式
          qiqiu.className = 'iconfont icon-qiqiuline';  //这里是iconfont里的字体图标，添加随机色
          qiqiu.style.cssText = 'position:absolute;z-index:999;left:'+(e.pageX - 16)+'px;top:'+(e.pageY - 26)+'px;color:rgb('+ Math.ceil(Math.random() * 255)+','+ Math.ceil(Math.random() * 255)+','+ Math.ceil(Math.random() * 255)+')';

          document.body.appendChild(qiqiu);
          
          //给气球添加渐变
          qiqiu.timer = setInterval(function(){
            qiqiu.style.top = qiqiu.offsetTop - 1 + 'px';
            qiqiu.style.opacity = getComputedStyle(qiqiu).opacity - 0.01;
          },16)
          
          //移除气球节点
          setTimeout(function() {
            clearInterval(qiqiu.timer);
            qiqiu.parentNode.removeChild(qiqiu);
          },2000)
        }
      }
    },

    mounted() {
      //加载背景散点图
      particlesJS.load('particles-js', '/particles.json', function() {
        console.log('callback - particles.js config loaded');
      });

      this.addPurple();
    },

    computed: {
      isShowIndexTop() {
        return this.$route.fullPath === '/'
      }
    },
  }
</script>
