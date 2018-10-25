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

    current: 0,
    animationData: {},
    animationData2: {},
    currentHeight: '420rpx',
    otherHeight: '360rpx'
  },

  onLoad() {
    this.setData({
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight')
    })

    this.getDataListIndex();
    this.shrink(this.data.currentHeight)
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
      console.log(res)
      res.data = res.data.map(item => {
        item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd');
        return item;
      })

      let listSet = {};

      listSet[orderBy + 'ArticleList'] = res.data;

      this.setData(listSet)

      if(orderBy == 'choice') this.stretch(this.data.currentHeight)
    }).catch(err => {
      console.log(err)
      app.showToast(err.description,2);
    })
    .then(()=>{
      wx.stopPullDownRefresh();
    })
  },


  handleArticleClick({ currentTarget:{dataset:{ id = '' }}}) {
    if( !id ) return;
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
  },


  //控制轮播图
  change(e){
    this.setData({
      current: e.detail.current
    })
    this.stretch(this.data.currentHeight)
    
    this.shrink(this.data.otherHeight)
  },

  // 放大
  stretch(h){
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(h).step()
    this.setData({
      animationData: animation.export(),
    })
  },
  // 缩小
  shrink(h){
    var animation2 = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation2 = animation2
    animation2.height(h).step()
    this.setData({
      animationData2: animation2.export()
    })
  },

})
