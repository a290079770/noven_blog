<template>
  <div id="app">
    <router-view/>

    <mt-tabbar fixed class="tabbar" v-model="selected" @click.native="tabbarIndex">
      <mt-tab-item id="/index">
        <img slot="icon" src="http://temp.im/100x100">
        首页
      </mt-tab-item>
      <mt-tab-item id="/article">
        <img slot="icon" src="http://temp.im/100x100">
        文章
      </mt-tab-item>
      <mt-tab-item id="/mine">
        <img slot="icon" src="http://temp.im/100x100">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      selected: '/index'
    }
  },
  methods: {
    tabbarIndex() {
      // console.log(this.selected)
      this.$router.push({
        path: this.selected, 
        // name: '要跳转的路径的 name,在 router 文件夹下的 index.js 文件内找',
        // params: { 
        //     name: 'name', 
        //     dataObj: this.msg
        // }
        /*query: {
            name: 'name', 
            dataObj: this.msg
        }*/
      })

    }
  },

  mounted() {
    //只有开发环境使用， 如果打包后想使用，注释这行代码即可
    if(process.env.NODE_ENV !== 'development') return;
    //开发环境，动态加载移动端调试工具
    function initEruda() {
      eruda.init();
    }

    let script = document.createElement('script');
    script.setAttribute('src', 'http://eruda.liriliri.io/eruda.min.js');
    script.setAttribute('defer', true);//异步，不卡线程
    script.setAttribute('async', true);//兼容
    script.onload = initEruda;
    document.body.appendChild(script)
  }
}
</script>

<style>
#app {
  padding-bottom: .6rem;
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
  font-size: 0.14rem;
}
.tabbar {
  img {
    width: .5rem;
    height: .5rem;
  }
}
.mint-tabbar {
  background-color: #fff;
  border-top: 1px solid #eee;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: #fff;
  color: red;
}
</style>
