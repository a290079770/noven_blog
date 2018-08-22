const app = getApp();

Page({
  data:{
    sysType:48,
    type:1,  //1 - 修改昵称。 2 - 修改简介
  },
  onLoad(options) {
    console.log(options)

    this.setData({
      sysType:app.globalData.sysType,
      type:options.type
    })
  }
})