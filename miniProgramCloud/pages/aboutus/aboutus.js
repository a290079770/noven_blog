const app = getApp();
const { Storage } = require('../../noven/storage'); 

Page({
  data:{
    statusBarHeight:0,
    titleBarHeight:0,
  },
  onLoad(options) {
    this.setData({
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight'),
    })
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})