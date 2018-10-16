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
    if (!userInfo) return;
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    })
  },
  nologin() {
    wx.navigateBack({
      delta: 1
    })
  }
})
