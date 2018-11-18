// pages/search.js
const app = getApp();
Page({
  /**
   * 组件的初始数据
   */
  data: {
    hasGotData: false,
    searchList: [],
    searchValue: '',
    cp: 1,
    ps: 99999
  },

  searchAction(e) {
    // console.log(e.detail.value)
    this.setData({
      searchValue: e.detail.value
    })
  },

  //获取搜索结果文章列表
  getDataList(keywords = '') {
    let _this = this;
    app.request({
      url: app.globalData.baseUrl + '/arcticle/arcticleList',
      method: 'GET',
      data: {
        cp: this.data.cp,
        ps: this.data.ps,
        keywords: keywords
      },
      success(res) {
        console.log(res)
        _this.setData({
          searchList: res.list,
          hasGotData: true
        })
      }
    })
  },
  searchRes() {
    if (!this.data.searchValue.replace(/ /g, '')){
      wx.showToast({
        title: '请输入关键字！',
      })
      return;
    }
    this.getDataList(this.data.searchValue);
  }
})
