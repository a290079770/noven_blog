const app = getApp()
Page({
  data: {
    articleList:[],
    hasGotData:false,
    orderBy: 'CreateTime',// 最新 CreateTime   热门 ReadCount   精选 CollectCount
    isShowScrollTopBtn: false,
    cp: 1,
    ps: 4,
    recordCount: 0
  },
  onLoad: function () {
    this.getDataList();
  },
  onShow: function () {
    // this.getDataList();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.data.cp = 1;
    this.getDataList(this.data.orderBy);
  },
  // 文章到达底部，自动加载更多
  onReachBottom() {
    // y页数和每页显示的数量的乘积 < 总数量的时候 页数 +1
    if (this.data.cp * this.data.ps < this.data.recordCount) {
      this.data.cp++;
      this.getDataList(this.data.orderBy, true);

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

  //获取文章列表
  getDataList(order = 'CreateTime',isLoadmore = false, keywords = '') {
    let _this = this;
    app.request({
      url: 'http://novenblog_api.com/arcticle/arcticleList',
      method: 'GET',
      data: {
        cp: this.data.cp,
        ps: this.data.ps,
        order: order,
        keywords: keywords
      },
      success(res) {
        console.log(res)
        let dataList = isLoadmore ? _this.data.articleList.concat(res.list) : res.list;
        _this.setData({
          articleList: dataList,
          recordCount: res.recordCount,
          hasGotData: true,
          cp: isLoadmore ? _this.data.cp : 1,// 判断是否加载更多，不是加载更多则将cp置为1，主要用于切换最新 热门 精选文章
        })
      }
    })
  },

  orderList(e) {
    let type = e.target.dataset.type;
    if (type != this.data.orderBy) {
      this.setData({
        orderBy: type,
        cp: 1
      })
      this.getDataList(type);
    }
  }
})
