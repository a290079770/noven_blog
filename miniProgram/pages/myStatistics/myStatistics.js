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
  }
})
