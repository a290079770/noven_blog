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

    hasView: wx.getStorageSync('hasView'),   // 0 - 否    1 - 是
    sysType:48
  },
  onLoad: function () {
    //获取用户是否第一次进入这个页面
    // WxParse.wxParse('article', 'html', `<p>asfdsddfsd水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费<blockquote><p>.first-in-notice {<br>       position: fixed;<br>      left: 0;<br>      top: 0;<br>      flex-direction: column;<br>   width: 100%;<br>   height: 100vh;<br>   background: rgba(0,0,0,0.7);<br>}</p></blockquote></p>`, this,5);
    this.setData({
      sysType:app.globalData.sysType
    })
  },

  iknowAction() {
    wx.setStorageSync('hasView',1);
    this.setData({
      hasView:1
    })
  }
})
