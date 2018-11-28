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
        hasMounted: false
      }
    },
    components:{
      'nav-menu':navMenu,
      'index-top':indexTop,
      'main-header':header,
      'main-footer':footer,
    },

    mounted() {
      this.hasMounted = true;
      particlesJS.load('particles-js', '/particles.json', function() {
        console.log('callback - particles.js config loaded');
      });
    },

    computed: {
      isShowIndexTop() {
        return this.$route.fullPath === '/'
      }
    },
  }
</script>
