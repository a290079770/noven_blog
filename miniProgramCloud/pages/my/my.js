//index.js
var app = getApp();
var { randomStr } = require('../../noven/utils/stringUtil')
var { Storage } = require('../../noven/storage')
var { dateFormat } = require('../../noven/utils/dateUtil');
//获取应用实例
Page({
  data: {
    titleImgUrl:'http://thyrsi.com/t6/373/1537521642x-1922733205.png',
    sysType:48,
    isLogin:false,
    userInfo:null,
    date:dateFormat(Date.now(),'yyyy-mm-dd'),
    publishCount:0,
    collectCount:0,
  },

  onLoad() {
    this.setData({
      sysType:app.globalData.sysType
    })
  },  

  onShow() {
    let {isLogin,userInfo} = app.globalData;
    this.setData({
      isLogin,
      userInfo
    })

    if(isLogin) {
      this.getDataCount(1);
      this.getDataCount(2);
    }
  },


  /**
   * [getDataCount 获取我的发布及收藏数量]
   * @Author   罗文
   * @DateTime 2018-09-28
   * @param    {[Number]}   type [1 - 发布。2 - 收藏]
   * @return   {[type]}        [description]
   */
  getDataCount(type) {
    let url = type == 1 ? 'getArticleList' : 'getCollectList';
    let count = {};

    app.callCloudFunction({
      // 要调用的云函数名称
      name: url,
      // 传递给云函数的event参数
      data: {
        isMy:true,
        count:true
      }
    }).then(res => {
      type == 1 ? count.publishCount = res.data : count.collectCount = res.data;
      this.setData(count);

    }).catch(err => {
      app.showToast(err.description,2);
    })
  },

  /**
   * [updateCover 修改头像]
   * @Author   罗文
   * @DateTime 2018-09-29
   * @return   {[type]}   [description]
   */
  updateCover() {
    if(!app.globalData.isLogin) {
      app.goTo({
       path:'/pages/login/login'
      })
      return;
    }

    let _this = this;
    
    app.uploadImgCloud()
    .then(res =>{
      _this.updateUserInfo({
        avatarUrl:res.data
      })
    })
    .catch(err => {
      console.log(err);
      app.showToast(err.description,2);
    })

  },


  /**
   * [updateUserInfo 更新用户信息统一方法]
   * @Author   罗文
   * @DateTime 2018-09-29
   * @param    {[Object]}   data [key - 键 value - 新的值]
   * @return   {[type]}        [description]
   */
  updateUserInfo(data) {
    app.callCloudFunction({
      name:'updateUserInfo',
      data
    })
    .then(res => {
      //更新Storage 和 Userinfo
      let newUserInfo = Object.assign({},this.data.userInfo,data);

      this.setData({
        userInfo:newUserInfo
      })

      // 更新Storage和界面
      Storage
      .set('userInfo',newUserInfo)
      .then(() => {
         app.globalData.userInfo = newUserInfo;
         app.showToast('修改成功',1);
      })
    })
    .catch(error => {
      app.showToast('',2);
    })
  },

  /**
   * [goTo 跳转到各个页面。1 - 我的发布。2 - 我的收藏。3 - 修改昵称。4 - 修改简介 5 - 关于我们]
   * @Author   罗文
   * @DateTime 2018-08-22
   */
  goTo(e) {
    let type = e.currentTarget.dataset.type;
    //除了type == 5,其他都要求登录
    if(type !== 5 && !app.globalData.isLogin) {
      app.goTo({
       path:'/pages/login/login'
      })
      return;
    }

    switch (+ type) {
      case 1:
      case 2:
        app.goTo({
           path:'/pages/article/myList/myList',
           query:{
             type
           }
        })
        break;
      case 3:
      case 4:
        app.goTo({
           path:'/pages/updateInfo/updateInfo',
           query:{
             type
           }
        })
        break;

      case 5:
        app.goTo({
          path:'/pages/aboutus/aboutus'
        })
        break;      
      default:
        // statements_def
        break;
    }

  },

  //点击去登录
  headerClick(e) {
    let _id = e.target.id;

    if(_id == 'loginInfo') {
       app.goTo({
        path:'/pages/login/login'
       })
    }
  },

  //退出登录
  logoutAction() {
    let _this = this;
    wx.showModal({
      title:'提示',
      content:'确定退出登录？',
      confirmColor:'#768fc3',
      success({ cancel , confirm }) {
        if(confirm) {
          //点击的确定
          _this.logout();
        }
      }
    })
  },

  logout() {
    app.globalData.userInfo = null;
    Storage
    .remove('userInfo')
    .then(()=>{
      wx.reLaunch({
        url:'/pages/index/index'
      })
    })
  }

})
