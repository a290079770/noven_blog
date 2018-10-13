const app = getApp();
const { Storage } = require('../../../noven/storage')

Page({
  data:{
    sysType:48,
  },
  onLoad(options) {
    this.setData({
      sysType: app.globalData.sysType,
    })
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})