const app = getApp();
var { dateFormat } = require('../../utils/dateUtil');
Page({
  data: {
    detailData: {},
    hasGotData: false,
    conIsArray: false
  },
  onLoad: function (option) {
    this.setData({
      articleId: option.id,
    })
    this.getDetail(option.id);
  },

  getDetail(id) {
    let _this = this;
    app.request({
      url:  app.globalData.baseUrl + '/arcticle/detail',
      method: 'GET',
      data: {
        Id: id
      },
      header: {
        token: app.globalData.token
      },
      success(res) {
        res.CreateTime = dateFormat(res.CreateTime, 'yyyy-mm-dd');
        // res.Content = '你好！'
        try {
          res.Content = JSON.parse(res.Content);
          // console.log(Array.isArray(res.Content))
        }catch(err) {
          // console.log(err);
        }
        // console.log(res)
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
          detailData: res,
          conIsArray: Array.isArray(res.Content)
        })
      }
    })
  },
  // 修改
  editArticle() {
    // console.log(this.data.detailData)
    wx.setStorageSync("detailData", this.data.detailData);
    wx.navigateTo({
      url: '/pages/addArticle/addArticle?title=修改文章'
    });
  }
})
