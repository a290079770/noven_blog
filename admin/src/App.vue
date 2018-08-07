<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @bgcolor: #ff5d6a;
  body, html {
    height: 100%;
    overflow: hidden;
  }
  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .el-input__inner {
    color: #d13954;
  }
  .el-menu {
    border-right: none;
  }
  .el-menu > .is-active {
    border-left:5px solid @bgcolor;
    padding-left:15px !important;
  }

  .el-menu > .is-active i{
     color:@bgcolor !important;
  }

  .el-menu-item:hover {
     color:white !important;
  }

  .el-menu-item:hover i {
      color:@bgcolor !important;
  }

  ::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
    background-color:transparent;
  }
  ::-webkit-scrollbar {//滚动条的宽度
    width:9px;
    height:9px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {//滚动条的设置
    background-color:#ddd;
    background-clip:padding-box;
    min-height:28px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color:#bbb;
    border-radius: 5px;
  }
</style>
