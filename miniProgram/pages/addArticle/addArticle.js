const app = getApp();
// pages/aboutUs/aboutUs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addArticleTitle: '',
    addArticleBrief: '',
    currentLength: {
      addArticleTitle: 0,
      addArticleBrief: 0
    },
    addArticleCover: 'http://temp.im/650x340'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  inputTitleAction(e) {
    let inputLen = app.getCurrentLength(e.detail.value);
    this.setData({
      addArticleTitle: app.getSliceStr(e.detail.value, 30),
      ['currentLength.addArticleTitle']: inputLen > 30 ? 30 : inputLen,
    })
  },
  // 获取输入框的值
  inputBriefAction(e) {
    let inputLen = app.getCurrentLength(e.detail.value);
    this.setData({
      addArticleBrief: app.getSliceStr(e.detail.value, 280),
      ['currentLength.addArticleBrief']: inputLen > 280 ? 280 : inputLen,
    })
  },
  // 上传封面
  updateCover() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        _this.setData({
          addArticleCover: tempFilePaths
        })
      }
    })
  }
})