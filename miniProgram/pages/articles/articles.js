const app = getApp()
Page({
  data: {
    articleList:[],
    hasGotData:false
  },
  onLoad: function () {
    this.getDataList();
  },
  onPullDownRefresh() {
    this.getDataList();
  },
  onReachBottom() {
    this.data.articleList.push({
      title: 222,
      id: 222,
      brief: '我的文章的简介222',
      readCount: 222,
      collectCount: 22222
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
