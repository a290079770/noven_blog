const app = getApp();
// pages/editInfo/editInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // type取值：3（修改昵称）   4（修改简介）    6（意见反馈）
    type: 3,
    nickname: '',
    brief: '',
    suggestion: '',
    currentLength: {
      nickname: 4,
      brief: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let { NickName: nickname, Introduction: brief } = app.globalData.userInfo
    console.log(app.globalData.userInfo)
    this.setData({
      type: + option.type,
      nickname,
      ['currentLength.nickname']: app.getCurrentLength(nickname),
      brief,
      ['currentLength.brief']: app.getCurrentLength(brief),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取输入框的值
  inputAction(e) {
    let inputLen = app.getCurrentLength(e.detail.value);
    // let _this = this;
    // console.log(e.detail.value)
    // console.log(this.data.type)
    switch (this.data.type) {
      case 3:
        this.setData({
          nickname: app.getSliceStr(e.detail.value, 12),
          ['currentLength.nickname']: inputLen > 12 ? 12 : inputLen
        })
        break;
      case 4:
        this.setData({
          brief: app.getSliceStr(e.detail.value, 280),
          ['currentLength.brief']: inputLen > 280 ? 280 : inputLen
        })
        break;
      case 6:
        this.setData({
          suggestion: e.detail.value
        })
        break;
      default:
        // 111
        break;
    }
  },
  // 封装 修改个人信息：修改昵称、修改简介 的接口
  requestUserInfo(updateNickname, updateBrief) {
    wx.request({
      url: 'http://novenblog_api.com/user/updateUserInfo',
      method: 'POST',
      data: {
        userInfo: {
          NickName: updateNickname || app.globalData.userInfo.NickName,
          Sex: app.globalData.userInfo.Sex || 0,
          CoverUrl: app.globalData.userInfo.CoverUrl || '',
          Age: app.globalData.userInfo.Age || 18,
          Introduction: updateBrief || app.globalData.userInfo.Introduction || ''
        }
      },
      header: {
        token: app.globalData.token
      },
      success(updateUserInfoRes) {
        // console.log(updateUserInfoRes)
        if (updateUserInfoRes.data.data) {
          wx.setStorageSync('userInfo', updateUserInfoRes.data.data);
          app.globalData.userInfo = updateUserInfoRes.data.data;
        } else {
          wx.showToast({
            title: updateUserInfoRes.data.description,
          })
        }
      }
    })
  },
  // 提交修改
  submitEdit() {
    let nickname = this.data.nickname;
    let brief = this.data.brief;
    let suggestion = this.data.suggestion;
    if (this.data.type === 3) {
      this.requestUserInfo(nickname, app.globalData.userInfo.Introduction);
    } else if (this.data.type === 4) {
      this.requestUserInfo(app.globalData.userInfo.NickName, brief);
    } else if (this.data.type === 6) {
      // 意见反馈接口
      app.request({
        url: 'http://novenblog_api.com/other/addFeedBack',
        method: 'POST',
        data: {
          Text: suggestion,
          ImgUrls: ''
        },
        success(res) {
          wx.showToast({
            title: '意见提交成功！',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          
        }
      })
      
    }
    
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  }
})