const app = getApp();
var { dateFormat } = require('../../noven/utils/dateUtil');
Page({
  data:{
    sysType:48,
    searchKeywords: '',
    dataList:[],
    hasGotData:false,
  },
  onLoad(options) {
    this.setData({
      sysType:app.globalData.sysType,
    })
  },

  /**
   * [getDataList 获取文章列表]
   * @return {[type]}       [description]
   */
  getDataList() {
    if(!this.data.searchKeywords) {
      app.showToast('请输入一点文字',2)
      return;
    }

    this.setData({
      hasGotData:false,
    })
    wx.showLoading({
      title:'查询文章...',
      mask:true
    })

    app.callCloudFunction({
      // 要调用的云函数名称
      name: 'getArticleList',
      // 传递给云函数的event参数
      data: {
        keywords:this.data.searchKeywords
      }
    }).then(res => {
      console.log(res)
      res.data = res.data.map(item => {
        item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd');
        return item;
      })

      this.setData({
        dataList:res.data,
        hasGotData:true
      })
      wx.hideLoading();
    }).catch(err => {
      app.showToast(err.description,2);
      wx.hideLoading();

      this.setData({
        hasGotData:true,
         dataList:[]
      })
    })
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  },

  searchInput(e) {
    this.setData({
      searchKeywords: e.detail.value
    })
  },
  //清除按钮
  clear() {
    this.setData({
      searchKeywords: ''
    })
  },
  //取消按钮
  cancel() {
    app.goBack();
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