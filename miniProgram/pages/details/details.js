const app = getApp();
var { dateFormat } = require('../../utils/dateUtil');
Page({
  data: {
    detailData: {},
    hasGotData: false
  },
  onLoad: function (option) {
    this.getDetail(option.id);
  },

  getDetail(id) {
    let _this = this;
    app.request({
      url: 'http://novenblog_api.com/arcticle/detail',
      method: 'GET',
      data: {
        Id: id
      },
      success(res) {
        // console.log(res)
        res.CreateTime = dateFormat(res.CreateTime, 'yyyy-mm-dd');
        _this.setData({
          detailData: res,
          hasGotData: true
        })
      }
    })
  }
})
