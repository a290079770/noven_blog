const app = getApp();
var { Storage } = require('../../noven/storage')

Page({
  data:{
    pageTitle:'',
    statusBarHeight:0,
    titleBarHeight:0,
    titleImgUrl:'http://thyrsi.com/t6/394/1540276844x-1404793579.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    account:'',
    password:'',
    isAccountInputFocus:false,
    isPwdInputFocus:false,
    isShowLoginForm:false,
  },
  onLoad(options) {
    this.setData({
      pageTitle:'登录Noven Blog',
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight')
    })
  },

  //微信授权
  loginWx({ detail }) {
    //如果拒绝授权
    if(detail.errMsg.indexOf('deny') !== -1) return;

    if (this.data.canIUse){
      app.globalData.userInfo = detail.userInfo
      app.globalData.isLogin = true

      this.recordUser(detail.userInfo);
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {

          app.globalData.userInfo = res.userInfo
          app.globalData.isLogin = true;
          
          this.recordUser(res.userInfo);
        }
      })
    }
  },

  recordUser(userInfo) {
    wx.showLoading({
      title:'授权登录中...',
      mask:true
    });
    //记录到云
    app.callCloudFunction({
      data: { 
        cloudFunc:'createOrUpdateUser',
        cloudData:userInfo
      }
    }).then(res => {
      console.log(res.data)
      Storage.set('userInfo',res.data);
      app.globalData.userInfo = res.data;

      wx.navigateBack({
        delta: 1
      })
    }).catch(err => {
      console.log(err)
      app.showToast(err.description,2);
    })
  },
  
  //账号密码登录
  loginAccount(e) {
    let type = e.currentTarget.dataset.type;   //1 - 打开登录框。  -1 收起  空 - 登录按钮
    
    if(!type) {
      app.showToast('暂不支持',2);
    }

    this.setData({
       isShowLoginForm:type == 1 ? true : false
    })

    
  },
  
  //放弃登录
  cancleLogin() {
    wx.navigateBack({
      delta: 1
    })
  },

  inputAction({ currentTarget : { dataset :{ input } } , detail : { value } }) {
    let state = input == 1 ? { account : value } : { password : value };
    this.setData(state)
  },

  inputFocus(e) {
    let type = e.type; 
    let input = e.currentTarget.dataset.input;   // 1  - 账号 2 - 密码
    if(type == 'focus') {
      if(input == 1) {
        this.setData({
          isAccountInputFocus:true
        })
      }else if(input == 2) {
        this.setData({
          isPwdInputFocus:true
        })
      }
    }else if( type == 'blur' ) {
      if(input == 1) {
        this.setData({
          isAccountInputFocus:false
        })
      }else if(input == 2) {
        this.setData({
          isPwdInputFocus:false
        })
      }
    }
  }
})