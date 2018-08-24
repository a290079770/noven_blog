//index.js
var app = getApp();
//获取应用实例
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    hotArticleList:[
      {
      	src:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      },
      {
      	src:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      },
      {
      	src:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      },
    ],
    newMoodList:[
      {
        title:'心情1心情1心情1心情1心情1心情1心情1心情1'
      },
      {
        title:'心情1心情1心情1',
      },
      {
        title:'心情1心情1心情1心情1心情1心情1心情1心情1心情1心情1心情1心情1心情1',
      },
    ],
    titleImgUrl:'../../images/myl.jpg',

    sysType:48
  },
  handleArticleClick(e) {
    // console.log(app.globalData.a)
    app.goTo({
      path:'/pages/article/articleDetail/articleDetail',
      query:{
        id:1,
      },
      replace:true
    });
  },

  goToArticleList() {
    app.goTo({
      path:'/pages/article/articleList/articleList'
    });
  },

  onLoad() {
    // app.goTo({
    //   path:'/pages/login/login',
    // })
    this.setData({
      sysType:app.globalData.sysType
    })
  },  

})
