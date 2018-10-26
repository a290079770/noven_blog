const app = getApp();
Page({
  data: {
    userEmail: '',
    userPwd: ''
  },
  onLoad: function () {
    
  },
  emailInput: function (e) {
    this.setData({
      userEmail: e.detail.value
    })
  },
  pwdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  login(e) {
    console.log(this.data.userEmail, this.data.userPwd)
  },
  shouquan({ detail : { userInfo } }) {
    // console.log(userInfo)
    if (!userInfo) return;
    wx.setStorageSync("userInfo", userInfo);
    app.globalData.isLogin = true;
    app.globalData.userInfo = userInfo;
    app.getCode();
    setTimeout(function() {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
    
  },
  nologin() {
    wx.navigateBack({
      delta: 1
    })
  },
  
})
