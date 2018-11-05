const app = getApp();

Component({
  properties: {
    data: {
      type: Object,
      default: {}
    }
  },
  data: {
    
  },
  attached: function () {
    // console.log(this.properties.data)
  },
  methods: {
    toDetails: function () {

      app.toDetails(this.properties.data.Id);
      
      // wx.navigateTo({
      //   url: "/pages/details/details?id=" + this.properties.data.id
      // })
    },
    // 删除
    deleteArticle() {
      let _this = this;
      let articleId = this.properties.data.Id
      wx.showModal({
        title: '确认删除该文章吗？',
        content: '',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // console.log(_this.properties.data.type)
            _this.properties.data.type == 1 ? _this.deletePulish(articleId) : _this.deleteCollect(articleId)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 删除我的发布的文章
    deletePulish(articleId) {
      console.log('删除我的发布')
      let _this = this;
      app.request({
        url: 'http://novenblog_api.com/arcticle/delete',
        method: 'POST',
        data: {
          Id: articleId,
        },
        success(res) {
          // console.log(res)
          _this.triggerEvent('myevent', _this.properties.data.type);

          wx.showToast({
            title: '删除成功！',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },
    // 删除我的收藏（取消收藏）
    deleteCollect(articleId) {
      console.log('删除我的收藏')
      let _this = this;
      app.request({
        url: 'http://novenblog_api.com/arcticle/collect',
        method: 'POST',
        data: {
          id: articleId,
          isCollect: false
        },
        success(res) {
          // console.log(res)
          _this.triggerEvent('myevent', _this.properties.data.type)

          wx.showToast({
            title: '删除成功！',
            icon: 'success',
            duration: 2000
          })
        }
      })
    },
  }
  
})
