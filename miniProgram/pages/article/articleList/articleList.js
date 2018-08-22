var WxParse = require('../../../lib/wxParse/wxParse.js');
var app = getApp();

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
    article:'',
    titleImgUrl:'../../../images/articlelist.png',

    hasView: wx.getStorageSync('hasView'),   // 0 - 否    1 - 是
    sysType:48
  },
  onLoad: function () {
    //获取用户是否第一次进入这个页面
    this.setData({
      sysType:app.globalData.sysType
    })
  },

  handleArticleClick(e) {
    // console.log(app.globalData.a)
    app.goTo(app,{
      path:'/pages/article/articleDetail/articleDetail',
      query:{
        id:1,
      }
    });
  },

  iknowAction() {
    wx.setStorageSync('hasView',1);
    this.setData({
      hasView:1
    })
  },


})
