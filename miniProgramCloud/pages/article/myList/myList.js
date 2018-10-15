const app = getApp();
var { dateFormat } = require('../../../noven/utils/dateUtil');

Page({
  data:{
    sysType:48,
    type:1,
    dataList:[],
    defaultUrl:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    isOpenEdit: false,

  },
  onLoad(options) {
    this.setData({
      sysType:app.globalData.sysType,
      type:options.type
    })

    this.getDataList(options.type) 
  },

  onPullDownRefresh(){
    this.getDataList(this.data.type);
  },

  /**
   * [getDataList 获取文章列表]
   * @Author   罗文
   * @DateTime 2018-09-27
   * @return   {[type]}   [description]
   */
  getDataList(type) {
    app.callCloudFunction({
      // 要调用的云函数名称
      name: 'getArticleList',
      // 传递给云函数的event参数
      data: {
        isMy: type == 1 ? true : false,
        isCollect: type == 2 ? true : false,
      }
    }).then(res => {
      res.data = res.data.map(item => {
        item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd HH:mm:ss');
        return item;
      })

      this.setData({
        dataList:res.data
      })
    }).catch(err => {
      app.showToast(err.description,2);
    }).then(()=>{
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
   
  //长按事件，触发删除操作
  itemLongPress() {
    if( this.data.isOpenEdit ) return;

    this.setData({
      isOpenEdit:true
    })
  },

  cancel() {
    this.setData({
      isOpenEdit:false
    })
  },


  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})