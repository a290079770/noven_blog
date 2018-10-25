const app = getApp();
const { Storage } = require('../../noven/storage'); 

Page({
  data:{
    pageTitle:'',
    statusBarHeight:0,
    titleBarHeight:0,
  },
  onLoad(options) {
    this.setData({
      pageTitle:'关于我们',
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight'),
    })
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})