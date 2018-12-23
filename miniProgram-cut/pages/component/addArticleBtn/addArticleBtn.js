const app = getApp();
Component({
  properties: {
    
  },
  data: {
    
  },
  methods: {
    addArticle() {
      if (!app.globalData.isLogin) {
        wx.navigateTo({
          url: '/pages/login/login'
        });
      } else {
        wx.navigateTo({
          url: '/pages/addArticle/addArticle'
        });
      }
    }
  },

  attached() {
    // console.log(this.properties.item)
  }
})
