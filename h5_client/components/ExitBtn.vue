<template>
  <section 
  class="flex flex-align-center flex-justify-center add-article-cont"
  @click="signOut"
  >
    <img src="~assets/icon/exit-white.svg" class="add-article"/>
  </section>
</template>

<script>
import { signOut } from '~/assets/service/userService'
export default {

  data() {
    return {
    }
  },

  methods:{
    //退出登录
    async signOut() {
      let confirm = await this.$confirm('是否要退出？','提示').catch(()=>null)
      if(!confirm) return; 

      //发起退出登录
      await signOut();

      this.delCookie('token');
      sessionStorage.clear();
      localStorage.clear();

      let { path } = this.$route;

      ['','index'].includes(path.replace(/\//g,'')) ? location.reload() : this.goTo('/','',true);
    },
  },
  created() {
    
  },
  mounted() {
    
  }
}
</script>

<style lang="less" scoped>
  @import '~assets/style/varite.less';
  
  .add-article-cont {
    position: fixed;
    right: 1rem;
    bottom: 1.5rem;
    z-index: 10;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background: @info;
    color: white;
    box-shadow: 0 .10rem .3rem rgba(118,143,195,.6);
  }

  .add-article {
    width: .50rem;
    height: .50rem;
  }
</style>