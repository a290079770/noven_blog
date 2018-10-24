//index.js
var app = getApp();
var { dateFormat } = require('../../noven/utils/dateUtil');
var { Storage } = require('../../noven/storage');
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

    statusBarHeight:0,
    titleBarHeight:0,

    isShowScrollTop:false,
  },

  onLoad() {
    this.setData({
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight')
    })

    this.getDataListIndex();
  },  

  onPullDownRefresh(){
    this.getDataListIndex();
  },

  onPageScroll({ scrollTop }) {
    if( scrollTop > 500 && !this.data.isShowScrollTop) {
      this.setData({
        isShowScrollTop:true
      });
    }else if(scrollTop <= 500 && this.data.isShowScrollTop) {
      this.setData({
        isShowScrollTop:false
      });
    }
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

  goToArticleList({ currentTarget:{dataset:{ type }}}) {
    app.goTo({
      path:'/pages/article/articleList/articleList',
      query:{
        type
      }
    });
  },

  hideScrollToTop() {
    this.setData({
      isShowScrollTop:false
    });
  }


})
