const app = getApp();
var { dateFormat } = require('../../noven/utils/dateUtil');
var { Storage } = require('../../noven/storage')
Page({
  data:{
    pageTitle:'',
    statusBarHeight:0,
    titleBarHeight:0,
    searchKeywords: '',
    dataList:[],
    hasGotData:false,
    isFocus:true
  },
  onLoad(options) {
    this.setData({
      pageTitle:'搜索文章',
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight')
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
      // 传递给云函数的event参数
      data: { 
        cloudFunc:'getArticleList',
        cloudData:{
          keywords:this.data.searchKeywords,
          ps:999
        }
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
    if( !this.data.searchKeywords ) return;
    this.setData({
      searchKeywords: '',
    })

    //清除搜索框后重新拉起键盘
    setTimeout(()=>{
      this.setData({
        isFocus: true,
      })
    },0)
  },
  //取消按钮
  cancel() {
    console.log(11111)
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