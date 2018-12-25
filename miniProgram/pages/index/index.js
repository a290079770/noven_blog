const app = getApp();
var { dateFormat } = require('../../utils/dateUtil');
Page({
  data: {
    hasGotBannerData: false,
    hasGotListData: false,
    title: "oven Blog",
    imgUrls: [
      // 'https://api.novenblog.xin/images/arc-default3.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    articleList: [],
    // indicatorColor: "rgba(226, 30, 30, .3)",
    // indicatorActiveColor: "rgba(245, 3, 43, .7)",
    interval: 5000,//自动切换时间间隔
    duration: 1000,//滑动动画时长
    isShowScrollTopBtn: false,
  },
  onShow() {
    // 最新 CreateTime   热门 ReadCount   精选 CollectCount
    this.getDataList();
    this.getDataList("CollectCount");// 获取轮播图（精选文章列表）
  },
  // 轮播图跳转详情页面
  toDetail(e) {
    // console.log(e.currentTarget.dataset.id)
    app.toDetails(e.currentTarget.dataset.id)
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getDataList();
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
  // 文章到达底部，自动加载更多
  onReachBottom() {
    
  },
  toArticleList() {
    wx.switchTab({
      url: "/pages/articles/articles"
    })
  },
  //获取文章列表
  getDataList(order = 'ReadCount') {
    // 最新 CreateTime   热门 ReadCount   精选 CollectCount
    let _this = this;
    app.request({
      url: app.globalData.baseUrl + '/arcticle/arcticleList',
      method: 'GET',
      data: {
        order
      },
      success(res) {
        // console.log(res)
        res.list = res.list.map(item => {
          item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd');
          return item;
        })
        if (order == "ReadCount") {
          _this.setData({
            articleList: res.list,
            hasGotListData: true
          })
        } else {// banner，精选文章列表
          _this.setData({
            imgUrls: res.list.slice(0, 5),
            hasGotBannerData: true
          })
        }
      }
    })
  }
})