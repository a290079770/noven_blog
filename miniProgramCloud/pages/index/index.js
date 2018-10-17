//index.js
var app = getApp();
var { dateFormat } = require('../../noven/utils/dateUtil');
//获取应用实例
Page({
  data: {
    swiperDefaultUrl: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    hotArticleList:[
      {
        isSkeleton:true
      },
      {
        isSkeleton:true
      },
      {
        isSkeleton:true
      },
    ],
    choiceArticleList:[
      {
        isSkeleton:true
      }
    ],
    newestArticleList:[
      {
        isSkeleton:true
      },
    ],
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

  onLoad() {
    this.setData({
      sysType:app.globalData.sysType,
      db: app.globalData.db
    })

    this.getDataListIndex();
  },  

  onPullDownRefresh(){
    this.getDataListIndex();
  },

  onShareAppMessage: function (res) {
    return {
      title:'记之所忆，为您记录点点滴滴～～'
    }
  },

  //首页获取列表和刷新入口
  getDataListIndex( ) {
    this.getDataList('hot');
    this.getDataList('newest');
    this.getDataList('choice');
  },
  /**
   * [getDataList 获取文章列表]
   * @Author   罗文
   * @DateTime 2018-09-27
   * @return   {[type]}   [description]
   */
  getDataList(orderBy) {
    app.callCloudFunction({
      // 要调用的云函数名称
      name: 'getArticleList',
      // 传递给云函数的event参数
      data: {
        orderBy,
        ps:5
      }
    }).then(res => {
      console.log(res)
      res.data = res.data.map(item => {
        item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd');
        return item;
      })

      let listSet = {};

      listSet[orderBy + 'ArticleList'] = res.data;

      this.setData(listSet)
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




})
