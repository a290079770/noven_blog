// const hex_sha1 = require('../../utils/sha1.js');
// const { hex_sha1 } = require('../../utils/sha1.js');
// import hex_sha1 from '../../utils/sha1.js'
import { hex_sha1 } from '../../utils/sha1.js'
const app = getApp();
Page({
  data: {
    userEmail: '',
    userPwd: '',
    confirmPwd: '',
    isShowReg: false
  },
  onLoad: function () {
    // console.log(hex_sha1('123456'))
  },
  emailInput: function (e) {
    this.setData({
      userEmail: e.detail.value
    })
  },
  pwdInput: function (e) {
    this.setData({
      userPwd: hex_sha1(e.detail.value)
    })
  },
  confirmPwdInput: function (e) {
    this.setData({
      confirmPwd: e.detail.value
    })
  },
  login(e) {
    console.log("邮箱：" + this.data.userEmail, "密码：" +this.data.userPwd)
    if (!this.data.userEmail) {
      wx.showToast({
        title: '请输入您的邮箱！',
      })
      return;
    }
    if (!this.data.userPwd) {
      wx.showToast({
        title: '请输入您的密码！',
      })
      return;
    }
    app.request({
      url: app.globalData.baseUrl + '/user/login',
      method: 'POST',
      data: {
        Account: this.data.userEmail,
        Password: this.data.userPwd
      },
      success(res) {
        // console.log(res);// token
        app.globalData.isLogin = true;
        app.globalData.token = res.token;
        app.request({
          url: app.globalData.baseUrl + '/user/detail',
          method: 'GET',
          success(detailRes) {
            console.log(detailRes);
            app.globalData.userInfo = detailRes;
            wx.setStorageSync("userInfo", detailRes);
            // _this.setData({
            //   publishCount: res.recordCount
            // })
          }
        })
        wx.showToast({
          title: '登录成功！',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        wx.setStorageSync('isNeedRefresh', true);
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  },
  shouquan({ detail : { userInfo } }) {
    // console.log(userInfo)
    if (!userInfo) return;
    wx.setStorageSync("userInfo", userInfo);
    app.globalData.isLogin = true;
    app.globalData.userInfo = userInfo;
    app.getCode();
    wx.setStorageSync('isNeedRefresh', true);
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
