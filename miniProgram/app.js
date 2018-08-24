const util = require('./utils/util.js');
//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //同步获取设备型号,设置顶部位置
    let sysInfo = wx.getSystemInfoSync();
    this.globalData.sysInfo = sysInfo;
    let sysType = sysInfo.screenHeight - sysInfo.windowHeight;


    //对齐胶囊所做的兼容
    if(this.globalData.sysTypesByScreen.indexOf(sysType) === 0) {
       //非iponeX的ios
       this.globalData.sysType = sysType + 6;
    }else if(this.globalData.sysTypesByScreen.indexOf(sysType) === 2) {
       //IphoneX
       this.globalData.sysType = sysType + 20;
    }else {
       //安卓
       this.globalData.sysType = sysType;
    }


    console.log(sysInfo)
    
  },
  globalData:{
    tabBar:['index','articleList','moodList','my'],
    sysTypesByScreen:[
       48,   //ios   非刘海
       54,   //andriod   安卓
       82,   //刘海屏
    ],
    sysInfo:{},
    sysType:48,  //对应sysTypesByScreen 的索引
  },
  
  /**
   * [goTo goToExec跳转的入口函数]
   * @Author   罗文
   * @DateTime 2018-08-23
   * @param    {Object}   params [跳转的附加参数]
   */
  goTo(params = {}){
    util.goToExec(this,params);
  },

  /**
   * [headerClick headerClickExec跳转的入口函数]
   * @Author   罗文
   * @DateTime 2018-08-23
   * @param    {Object}   params [跳转的附加参数]
   */
  headerClick(e){
    util.headerClickExec(e,this);
  },



  ...util
  
})