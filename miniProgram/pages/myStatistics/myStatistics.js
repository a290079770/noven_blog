const app = getApp();
var { dateFormat } = require('../../utils/dateUtil');
Page({
  data: {
    // type取值：1（我的发布）   2（我的收藏）
    type: 1,
    collectList: [],
    publishList: [],
    cp: 1,
    ps: 4,
    recordCount: 0,
    hasGotData: false,
    isShowScrollTopBtn: false,
  },
  onLoad: function (option) {
    // console.log(option.type)
    this.setData({
      type: + option.type
    })

    option.type == 1 ? this.getPublishData() : this.getCollectData()
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.data.cp = 1;
    this.data.type == 1 ? this.getPublishData() : this.getCollectData()
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
    // console.log(11111111111);
    // y页数和每页显示的数量的乘积 < 总数量的时候 页数 +1
    if (this.data.cp * this.data.ps < this.data.recordCount) {
      this.data.cp++;
      this.data.type == 1 ? this.getPublishData(true) : this.getCollectData(true)
    }
  },
  // 我的发布
  getPublishData(isLoadmore = false) {
    let _this = this;
    app.request({
      url:  app.globalData.baseUrl + '/arcticle/arcticleList',
      method: 'GET',
      data: {
        isMy: true,
        cp: this.data.cp,
        ps: this.data.ps,
      },
      success(res) {
        res.list.map(item => {
          item.type = 1;
          item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd');
          return item;
        })
        // console.log(res)
        _this.setData({
          publishList: isLoadmore ? _this.data.publishList.concat(res.list) : res.list,
          recordCount: res.recordCount,
          hasGotData: true,
          cp: isLoadmore ? _this.data.cp : 1
        })
      }
    })
  },
  // 我的收藏
  getCollectData(isLoadmore = false) {
    let _this = this;
    app.request({
      url:  app.globalData.baseUrl + '/arcticle/collectList',
      method: 'GET',
      data: {
        cp: this.data.cp,
        ps: this.data.ps,
      },
      success(res) {
        res.list.map(item => {
          item.type = 2;
          return item;
        })
        // console.log(res)
        _this.setData({
          collectList: isLoadmore ? _this.data.collectList.concat(res.list) : res.list,
          recordCount: res.recordCount,
          hasGotData: true,
          cp: isLoadmore ? _this.data.cp : 1
        })
      }
    })
  },

  onMyEvent(e) {
    // console.log(e.detail)
    this.data.cp = 1;
    this.data.hasGotData = false;
    e.detail == 1 ? this.getPublishData() : this.getCollectData()
  }
})
