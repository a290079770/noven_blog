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
    isShowScrollTopBtn: false,
    cp: 1,
    ps: 4,
    recordCount: 0
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.data.cp = 1;
    this.getDataList(this.data.searchValue);
  },
  // 文章到达底部，自动加载更多
  onReachBottom() {
    // y页数和每页显示的数量的乘积 < 总数量的时候 页数 +1
    if (this.data.cp * this.data.ps < this.data.recordCount) {
      this.data.cp++;
      this.getDataList(this.data.searchValue, true);

    }
  },
  // 监听用户滑动页面事件
  onPageScroll(e) {
    // console.log(e.scrollTop)
    if (e.scrollTop > 1200 && !this.data.isShowScrollTopBtn) {
      this.setData({
        isShowScrollTopBtn: true
      })
    } else if (e.scrollTop < 1200 && this.data.isShowScrollTopBtn) {
      this.setData({
        isShowScrollTopBtn: false
      })
    }
  },
  searchAction(e) {
    // console.log(e.detail.value)
    this.setData({
      searchValue: e.detail.value
    })
  },

  //获取搜索结果文章列表
  getDataList(keywords = '', isLoadmore = false) {
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
        console.log(res);
        let dataList = isLoadmore ? _this.data.searchList.concat(res.list) : res.list;
        _this.setData({
          searchList: dataList,
          hasGotData: true,
          recordCount: res.recordCount,
          cp: isLoadmore ? _this.data.cp : 1,// 判断是否加载更多，不是加载更多则将cp置为1，主要用于切换最新 热门 精选文章
        })
      }
    })
  },
  // 清空输入框
  clearSearchInput() {
    if (!this.data.searchValue) return;
    this.data.cp = 1;
    this.setData({
      searchValue: '',
      searchList: [],
      hasGotData: false,
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
