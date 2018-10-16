const appUtil = require('./noven/app.js');
var { Storage } = require('./noven/storage')

//app.js
App({
  globalData:{
    tabBar:['index','articleList','moodList','my'],
    sysTypesByScreen:[
       48,   //ios   非刘海
       54,   //andriod   安卓
       82,   //刘海屏
    ],
    sysInfo:{},
    sysType:48,  //对应sysTypesByScreen 的索引
    isLogin:false,
    userInfo:null,
    db:null,
  },
  onLaunch: function () {
    //初始化云环境
    this.initCloud();

    //获取并设置全局用户信息，登录状态
    this.getUserInfo();
    

    //计算全局自定义胶囊的高度
    this.setSysType();
  },

  /**
   * [getUserInfo 获取并设置全局用户信息，登录状态]
   * @Author   罗文
   * @DateTime 2018-09-28
   */
  getUserInfo() {
    //从云端获取用户数据
    appUtil.callCloudFunction({
      name:'getUserInfo',
    })
    .then(res => {
       let { data } = res;
       this.globalData.isLogin = !!data;

       if(!data) {
          //未查到用户信息
          this.globalData.userInfo = null;
          Storage
          .remove('userInfo');
       }else {
          this.globalData.userInfo = data;
          Storage
          .set('userInfo',data);
       }
    })
    .catch(err => {
      appUtil.showToast(err.description,2);
    })
  },

  /**
   * [initCloud 初始化云环境]
   * @Author   罗文
   * @DateTime 2018-09-28
   */
  initCloud() {
    //连接云cloud
    if(wx.cloud) {
      //如果支持云
      wx.cloud.init({
        //设置环境
        env: 'test-e35d4b',
        //记录用户
        traceUser: true
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'当前微信版本暂不支持云开发技术，请更新微信！',
        showCancel:false
      })
    }
  },

  /**
   * [setSysType 计算全局自定义胶囊的高度]
   * @Author   罗文
   * @DateTime 2018-09-28
   */
  setSysType() {
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
  },
  /**
   * [goTo goToExec跳转的入口函数]
   * @Author   罗文
   * @DateTime 2018-08-23
   * @param    {Object}   params [跳转的附加参数]
   */
  goTo(params = {}){
    appUtil.goToExec(this,params);
  },

  /**
   * [headerClick headerClickExec跳转的入口函数]
   * @Author   罗文
   * @DateTime 2018-08-23
   * @param    {Object}   params [跳转的附加参数]
   */
  headerClick(e){
    appUtil.headerClickExec(e,this);
  },



  ...appUtil,
})