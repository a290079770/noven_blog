const app = getApp();
var { dateFormat } = require('../../utils/dateUtil');
Page({
  data: {
    userInfo: null,
    isLogin: false,
    time: dateFormat(new Date(), 'yyyy-mm-dd'),
    city: "成都市"
  },
  onLoad: function () {
    
  },
  onShow() {
    //如果Storage中有值，且userInfo为null的时候，刷新用户
    var storageUesrInfo = wx.getStorageSync("userInfo");
    if (storageUesrInfo) {
      // console.log(storageUesrInfo)
      // console.log(app.globalData)
      this.setData({
        userInfo: app.globalData.userInfo,
        isLogin: true,
        ['userInfo.ThisTime']: dateFormat(storageUesrInfo.ThisTime, 'yyyy-mm-dd')
      })
    }
    if (!this.data.isLogin) return;
  },
  toLogin: function() {
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },
  
})
