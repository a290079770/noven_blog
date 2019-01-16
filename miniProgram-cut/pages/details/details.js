const app = getApp();
var { dateFormat } = require('../../utils/dateUtil');
Page({
  data: {
    detailData: {},
    hasGotData: false,
    conIsArray: false,
  },
  onLoad: function (option) {
    wx.setStorageSync('isNeedRefresh', false);
    this.setData({
      articleId: option.id,
    })
    this.getDetail(option.id);
    // console.log(option.id);

    // 小程序 返回刷新更新上一页数据
    // var pages = getCurrentPages();
    // console.log(pages)
    // if (pages.length > 1) {
    //   //上一个页面实例对象
    //   var prePage = pages[pages.length - 2];
    //   //关键在这里
    //   prePage.onLoad();
    // } 

  },
  onShow() {
    if (wx.getStorageSync('isNeedRefresh')) {
      // console.log(999999)
      this.getDetail(this.data.articleId);
      wx.setStorageSync('isNeedRefresh', false);
    }
  },
  getDetail(id) {
    let _this = this;
    app.request({
      url:  app.globalData.baseUrl + '/arcticle/detail',
      method: 'GET',
      data: {
        Id: id
      },
      success(res) {
        res.CreateTimeFormate = dateFormat(res.CreateTime, 'yyyy-mm-dd');
        // res.Content = '你好！'
        try {
          res.Content = JSON.parse(res.Content);
          // console.log(Array.isArray(res.Content))
        }catch(err) {
          // console.log(err);
        }
        console.log(res)
        _this.setData({
          detailData: res,
          hasGotData: true,
          conIsArray: Array.isArray(res.Content)
        })
      }
    })
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
        id: this.data.articleId,
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
  }
})
