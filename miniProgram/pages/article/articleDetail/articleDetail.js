var WxParse = require('../../../lib/wxParse/wxParse.js');
var app = getApp();

Page({
  data: {
    article:'',
    hasView: wx.getStorageSync('hasView'),   // 0 - 否    1 - 是
    sysType:48,
    detail:{}
  },
  onLoad: function ({ id }) {
    //获取用户是否第一次进入这个页面
    this.setData({
      sysType:app.globalData.sysType
    })

    app.callCloudFunction({
      // 要调用的云函数名称
      name: 'getArticleDetail',
      // 传递给云函数的event参数
      data: {
        id
      }
    }).then(res => {
       //处理下时间
       res.data.CreatTime = app.dateFormat(res.data.CreatTime,'yyyy-mm-dd HH:mm:ss');

       this.setData({
         detail:res.data
       })

       WxParse.wxParse('article', 'html', res.data.Content , this,5);
    }).catch(err => {
      console.log(err)
      app.showToast(err.description,2);
    })
  },

  
  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }



})
