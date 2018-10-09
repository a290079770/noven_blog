var WxParse = require('../../../lib/wxParse/wxParse.js');
var { dateFormat } = require('../../../noven/utils/dateUtil');
var app = getApp();

Page({
  data: {
    id:null,
    article:'',
    hasView: wx.getStorageSync('hasView'),   // 0 - 否    1 - 是
    sysType:48,
    detail:null,
    hasCollect:false,
    collecting:false,   //拦截连续点击
  },
  onLoad: function ({ id }) {
    //获取用户是否第一次进入这个页面
    this.setData({
      sysType:app.globalData.sysType,
      id,
    })

    this.getDetail(id)
  },

  onShow() {
    this.getDetail(this.data.id)
  },

  onPullDownRefresh(){
    this.getDetail(this.data.id);
  },


  getDetail(id) {
    if(!id) {
      app.showToast('文章id为空',2);
      return 
    }
    app.callCloudFunction({
      // 要调用的云函数名称
      name: 'getArticleDetail',
      // 传递给云函数的event参数
      data: {
        id
      }
    }).then(res => {
       //处理下时间
       res.data.CreatTime = dateFormat(res.data.CreatTime,'yyyy-mm-dd HH:mm:ss');

       this.setData({
         detail: res.data,
         hasCollect: res.data.hasCollect || false
       })

       WxParse.wxParse('article', 'html', res.data.Content , this,5);
    }).catch(err => {
      console.log(err)
      app.showToast(err.description,2);
    })
  },



  //添加或取消收藏
  addOrCancelCollection() {
    //验证登录状态
    if(!app.globalData.isLogin) {
       //去登录
       app.goTo({
        path:'/pages/login/login'
       })

       return;
    }

    //发起操作
    if(this.data.collecting) {
      app.showToast('操作过于频繁',2);
      return;
    }

    this.setData({
      collecting:true
    })

    let hasCollect = this.data.hasCollect;

    let isAdd = hasCollect ? false : true;

    this.setData({
      hasCollect: !hasCollect
    })

    app.callCloudFunction({
      name:'addOrCancelCollection',
      data:{
        isAdd,
        id:this.data.id
      }
    })
    .then(res => {
      console.log(res)
      let add = isAdd ? 1 : -1;

      this.setData({
        collecting:false,
        ['detail.CollectCount']: + this.data.detail.CollectCount + add
      })
    }).catch(err => {
      console.log(err)
      app.showToast(err.description,2);
      this.setData({
        hasCollect,
        collecting:false
      })
    })
  },
  
  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }



})
