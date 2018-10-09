const app = getApp();

Page({
  data:{
    sysType:48,
  },
  onLoad(options) {
    console.log(options)

    this.setData({
      sysType:app.globalData.sysType,
    })
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})