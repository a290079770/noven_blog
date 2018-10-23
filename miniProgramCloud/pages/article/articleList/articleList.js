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
   * @param  {[Number]} index [当前请求的排序数据索引]
   * @return {[type]}       [description]
   */
  getDataList(index = 0) {
    if( index < 0 || index > 2) return;

    wx.showLoading({ title : '加载中...',mask:true});
    let order = [ 'newest' , 'choice', 'hot'];
    app.callCloudFunction({
      // 要调用的云函数名称
      name: 'getArticleList',
      // 传递给云函数的event参数
      data: {
        orderBy:order[index],
      }
    }).then(res => {
      console.log(res)
      res.data = res.data.map(item => {
        item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd');
        return item;
      })

      this.setData({
        hotArticleList:res.data
      })
    }).then(()=>{
      wx.stopPullDownRefresh();
      wx.hideLoading();
    }).catch(err => {
      app.showToast(err.description,2);
      wx.hideLoading();
    })
  },

  //改变当前活跃的na vba r
  changeNavAction({ currentTarget:{dataset:{ index }}}) {
    this.setData({
      activeIndex:index
    })

    //根据当前索引，获取数据
    this.getDataList(index);
  },

  //去搜索界面
  goSearch() {
    app.goTo({
      path:'/pages/search/search',
    });
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
