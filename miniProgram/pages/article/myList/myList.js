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

  handleArticleClick(e) {
    // console.log(app.globalData.a)
    app.goTo({
      path:'/pages/article/articleDetail/articleDetail',
      query:{
        id:1,
      }
    });
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})