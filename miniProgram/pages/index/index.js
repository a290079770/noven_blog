const app = getApp();
var { dateFormat } = require('../../utils/dateUtil');
Page({
  data: {
    hasGotData: false,
    title: "博客的标题拉阿拉",
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    articleList: [],
    // indicatorColor: "rgba(226, 30, 30, .3)",
    // indicatorActiveColor: "rgba(245, 3, 43, .7)",
    interval: 5000,//自动切换时间间隔
    duration: 1000//滑动动画时长
  },
  onShow() {
    this.getDataList();
  },
  // 轮播图跳转详情页面
  toDetail() {
    app.toDetails(10)
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getDataList();
  },
  // 文章到达底部，自动加载更多
  onReachBottom() {
    this.data.articleList.push({
      Title: 222,
      Author: '我是作者',
      Id: 222,
      Brief: '我的文章的简介222',
      ReadCount: 222,
      CollectCount: 22222,
      CreateTime: '2018-10-20'
    })
    let newArticleList = this.data.articleList;
    this.setData({
      articleList: newArticleList
    })
  },
  //获取文章列表
  getDataList() {
    let _this = this;

    app.request({
      url: 'http://novenblog_api.com/arcticle/arcticleList',
      method: 'GET',
      success(res) {
        // console.log(res)
        res = res.map(item => {
          item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd');
          return item;
        })
        _this.setData({
          articleList: res,
          hasGotData: true
        })
      }
    })
  }
})