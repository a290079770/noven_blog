var app = getApp();
var { dateFormat } = require('../../../noven/utils/dateUtil');

Page({
  data: {
    hotArticleList:[
      {
      	isSkeleton:true
      }
    ],
    titleImgUrl:'../../../images/articlelist.png',
    sysType:48,

    activeIndex: 0,  //当前列表的索引  0 - 最新  1 - 精选   2 - 热门
  },
  onLoad: function () {
    //获取用户是否第一次进入这个页面
    this.setData({
      sysType:app.globalData.sysType
    })

    this.getDataList();
  },

  onPullDownRefresh(){
    this.getDataList();
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
      app.showToast(err.description,2);
    }).then(()=>{
      wx.stopPullDownRefresh();
    })
  },

  //改变当前活跃的na vba r
  changeNavAction({ currentTarget:{dataset:{ index }}}) {
    console.log(index)
    this.setData({
      activeIndex:index
    })
  },


  //点击每个文章
  handleArticleClick({ currentTarget:{dataset:{ id = '' }}}) {
    app.goTo({
      path:'/pages/article/articleDetail/articleDetail',
      query:{
        id,
      }
    });
  },

})
