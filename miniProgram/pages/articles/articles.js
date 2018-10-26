const app = getApp()
Page({
  data: {
    articleList:[],
    hasGotData:false
  },
  onLoad: function () {
    this.getDataList();
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
        _this.setData({
          articleList: res,
          hasGotData:true
        })
      }
    })
  }
})
