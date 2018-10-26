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
  font-size: 0.18rem;
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
