<template>
  <section 
  class="flex flex-align-center flex-justify-center add-article-cont"
  @click="addArticleAction"
  >
    <img src="~assets/icon/add.svg" class="add-article"/>
  </section>
</template>

<script>
export default {

  data() {
    return {
    }
  },

  methods:{
    //拦截或跳转到新增文章页
    addArticleAction() {
      this.goTo('/addArticle')
      return
      try {
        let userInfo = JSON.parse(localStorage.userInfo);
        //判断是否有权限新增
        
      }catch(e) {
        //没有用户信息的话用默认的
        
      }
    }
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
    background: #d13954;
    color: white;
    box-shadow: 0 .10rem .3rem rgba(248,76,91,.6);
  }

  .add-article {
    width: .50rem;
    height: .50rem;
  }
</style>