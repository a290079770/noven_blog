const app = getApp();

Page({
  data:{
    sysType:48,
    titleImgUrl:'http://y.photo.qq.com/img?s=Qgk0irOPX&l=y.jpg',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    isAccountInputFocus:false,
    isPwdInputFocus:false,
    isShowLoginForm:false,
  },
  onLoad(options) {
    this.setData({
      sysType:app.globalData.sysType,
    })
  },

  //微信授权
  loginWx(e) {
    if (this.data.canIUse){
	  this.setData({
	    userInfo: e.detail.userInfo,
	    hasUserInfo: true
	  })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  
  //账号密码登录
  loginAccount(e) {
    let type = e.currentTarget.dataset.type;   //1 - 打开登录框。  -1 收起

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