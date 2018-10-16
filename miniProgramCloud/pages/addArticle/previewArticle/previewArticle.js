var { dateFormat } = require('../../../noven/utils/dateUtil');
var { Storage } = require('../../../noven/storage');
var app = getApp();

Page({
  data: {
    hasView: wx.getStorageSync('hasView'),   // 0 - 否    1 - 是
    sysType:48,
    detail:null,
    formatCreateTime:null,
    // detail:{
    //   Title:'',
    //   Url:'',
    //   Brief:'',
    //   Content:[]
    // },
  },
  onLoad: function () {
    //获取用户是否第一次进入这个页面
    Storage
    .get('previewArticleData')
    .then( ({ data }) => {
      this.setData({
        sysType:app.globalData.sysType,
        detail:data,
        hasView:true,
        formatCreateTime:dateFormat(data.CreateTime,'yyyy-mm-dd')
      })
    })
    .catch( err =>{
      console.log(err)
      app.showToast('预览文章出错',2);
    })
  },

  editArticle() {
    app.goBack();
  },

  //发布文章
  submitArticle() {
    wx.showLoading({
      title:'正在发布',
      mask:true
    })

    app.callCloudFunction({
      name:'createOrUpdateArticle',
      data:{
        detail:this.data.detail
      }
    })
    .then( ({ data }) => {
      if( data ) 
        return Promise.resolve(data)
      else 
        return Promise.reject({ description:'发布失败' })
    })
    .then( data => {
      app
      .showToast('发布成功')
      .then(()=>{
        Storage.remove('previewArticleData');
        
        app.goTo({
          path:'/pages/article/articleDetail/articleDetail',
          query:{
            id:data
          },
          isReplace:true
        })
      })
    })
    .catch( err => {
      console.log(err);
      app.showToast(err.description,2);
    }) 
  },

 
  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }



})