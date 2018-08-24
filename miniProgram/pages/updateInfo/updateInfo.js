const app = getApp();

Page({
  data:{
    sysType:48,
    type:3,  //3 - 修改昵称。 4 - 修改简介
  },
  onLoad(options) {
    // console.log(options)

    // console.log(getCurrentPages()[getCurrentPages().length - 1])

    this.setData({
      sysType:app.globalData.sysType,
      type:options.type
    })
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})