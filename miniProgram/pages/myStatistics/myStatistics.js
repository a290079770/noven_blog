const app = getApp();
Page({
  data: {
    // type取值：1（我的发布）   2（我的收藏）
    type: 1,
    collectList: [
      {
        Title: 1,
        Id: 1,
        Brief: '我的文章的简介111',
        ReadCount: 1,
        CollectCount: 222
      },
    ],
    publishList: []
  },
  onLoad: function (option) {
    // console.log(option.type)
    this.setData({
      type: + option.type
    })

    this.getData()
  },
  getData() {
    let _this = this;
    app.request({
      url: 'http://novenblog_api.com/arcticle/arcticleList',
      method: 'GET',
      data: {
        // isMy: true,
        ReadCount: true,
        CollectCount: true,
        token: app.globalData.token,
      },
      success(res) {
        console.log(res)
        _this.setData({
          collectList: res,
          publishList: res
        })
      }
    })
  }
})
