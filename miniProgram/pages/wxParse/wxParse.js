// pages/wxParse/wxParse.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasGotData: true,
    detailData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailData: wx.getStorageSync("detailData")
    })
    
    var article = this.data.detailData.Content;
    // article = article.replace(/        /g,'');
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    var that = this;
    WxParse.wxParse('article', 'html', article, that, 1);

    wx.removeStorageSync("detailData");
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
  // 收藏
  isCollect() {
    // 如果用户未登录，则跳转到登录页面
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/login/login"
      })
      return;
    }
    let hasCollect = this.data.detailData.HasCollect;
    let _this = this;
    app.request({
      url:  app.globalData.baseUrl + '/arcticle/collect',
      method: 'POST',
      data: {
        id: this.data.detailData.Id,
        isCollect: !hasCollect
      },
      success(res) {
        // console.log(res)
        try {
          res.Content = JSON.parse(res.Content);
          console.log(Array.isArray(res.Content))
        } catch (err) {
          console.log(err);
        }
        _this.setData({
          detailData: Object.assign({},_this.data.detailData,res),
          conIsArray: Array.isArray(res.Content)
        })
      }
    })
  },
})