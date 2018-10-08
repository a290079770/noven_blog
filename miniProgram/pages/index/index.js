//index.js
var app = getApp();
var { dateFormat } = require('../../noven/utils/dateUtil');
//获取应用实例
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    hotArticleList:[],
    newMoodList:[
      {
        title:'心情1心情1心情1心情1心情1心情1心情1心情1'
      },
      {
        title:'心情1心情1心情1',
      },
      {
        title:'心情1心情1心情1心情1心情1心情1心情1心情1心情1心情1心情1心情1心情1',
      },
    ],
    titleImgUrl:'../../images/myl.jpg',

    sysType:48
  },
  /**
   * [getDataList 获取文章列表]
   * @Author   罗文
   * @DateTime 2018-09-27
   * @return   {[type]}   [description]
   */
  getDataList() {
    app.callCloudFunction({
      // 要调用的云函数名称
      name: 'getArticleList',
      // 传递给云函数的event参数
      data: {}
    }).then(res => {
      res.data = res.data.map(item => {
        item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd');
        return item;
      })

      this.setData({
        hotArticleList:res.data
      })
    }).catch(err => {
      console.log(err)
      app.showToast(err.description,2);
    })
    .then(()=>{
      wx.stopPullDownRefresh();
    })
  },


  handleArticleClick({ currentTarget:{dataset:{ id = '' }}}) {
    app.goTo({
      path:'/pages/article/articleDetail/articleDetail',
      query:{
        id,
      }
    });
  },

  goToArticleList() {
    app.goTo({
      path:'/pages/article/articleList/articleList'
    });
  },


  onLoad() {
    this.setData({
      sysType:app.globalData.sysType,
      db: app.globalData.db
    })

    this.getDataList();
  },  

  onPullDownRefresh(){
    this.getDataList();
  }

})
