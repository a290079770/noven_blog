// var WxParse = require('../../../lib/wxParse/wxParse.js');

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

    hasView: wx.getStorageSync('hasView')   // 0 - 否    1 - 是
  },
  onLoad: function () {
    //获取用户是否第一次进入这个页面
//     WxParse.wxParse('article', 'html', `<pre>[
//   {
//     "src": "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
//   },
//   {
//     "src": "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg"
//   },
//   {
//     "src": "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
//   }
// ]</pre>`, this,5);

//     console.log(this.data.article)
  },

  iknowAction() {
    wx.setStorageSync('hasView',1);
    this.setData({
      hasView:1
    })
  }
})
