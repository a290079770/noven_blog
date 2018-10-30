var { dateFormat } = require('../../../noven/utils/dateUtil');
var { Storage } = require('../../../noven/storage');
var app = getApp();

Page({
  pageTitle:'',
  statusBarHeight:0,
  titleBarHeight:0,
  data: {
    hasView: wx.getStorageSync('hasView'),   // 0 - 否    1 - 是
    
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
    this.setData({
      pageTitle:'预览文章',
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight'),
    })
    //获取用户是否第一次进入这个页面
    Storage
    .get('previewArticleData')
    .then( ({ data }) => {
      this.setData({
        
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
      // 传递给云函数的event参数
      data: { 
        cloudFunc:'createOrUpdateArticle',
        cloudData:{
          detail:this.data.detail
        }
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
        Storage.set('articleHasUpdate',true);
        
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
