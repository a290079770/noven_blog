const app = getApp();
var { dateFormat } = require('../../utils/dateUtil');
Page({
  data: {
    userInfo: null,
    isLogin: false,
    publishCount: 0,
    collectCount: 0
  },
  onLoad: function () {
    
  },
  onShow() {
    //如果Storage中有值，且userInfo为null的时候，刷新用户
    var storageUesrInfo = wx.getStorageSync("userInfo");
    if (storageUesrInfo) {
      // console.log(storageUesrInfo)
      // console.log(app.globalData)
      this.setData({
        userInfo: app.globalData.userInfo,
        isLogin: true,
        ['userInfo.ThisTime']: dateFormat(storageUesrInfo.ThisTime, 'yyyy-mm-dd')
      })
    }
    if (!this.data.isLogin) return;
    
    this.getPublishData();
    this.getCollectData();
  },
  toLogin: function() {
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },
  goTo(e) {
    let type = + e.currentTarget.dataset.type;
    // console.log(type)
    if (!this.data.isLogin && type !== 5) {
      this.toLogin();
      return;
    }

    switch(type) {
      case 1:
      case 2:
        wx.navigateTo({
          url: "/pages/myStatistics/myStatistics?type=" + type
        })
        break;
      case 3:
      case 4:
      case 6:
        wx.navigateTo({
          url: "/pages/editInfo/editInfo?type=" + type
        })
        break;
      case 5:
        wx.navigateTo({
          url: "/pages/aboutUs/aboutUs"
        })
        break;
      default:
        // 111
        break;
    }
  },
  editTouxiang() {
    if (!this.data.isLogin) {
      this.toLogin();
      return;
    }
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths)
        
        wx.uploadFile({
          url:  app.globalData.baseUrl + '/images/uploadFile',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'fileData': 'test'
          },
          success(res) {
            let data = JSON.parse(res.data)
            // console.log(data)

            if(data.code !== 200) {
              wx.showToast({
                title: data.description,
              })
            }else {
              
              // 头像上传成功后调用更新用户信息接口
              wx.request({
                url:  app.globalData.baseUrl + '/user/updateUserInfo',
                method: 'POST',
                data: {
                  userInfo: {
                    NickName: app.globalData.userInfo.NickName,
                    Sex: app.globalData.userInfo.Sex || 0,
                    CoverUrl: data.data.url.replace(/\\/g,'/') || '',
                    Age: app.globalData.userInfo.Age || 18,
                    Introduction: app.globalData.userInfo.Introduction || ''
                  }
                },
                header: {
                  token: app.globalData.token
                },
                success(updateUserInfoRes) {
                  // console.log(updateUserInfoRes)
                  if(updateUserInfoRes.data.data) {
                    wx.setStorageSync('userInfo', updateUserInfoRes.data.data);
                    app.globalData.userInfo = updateUserInfoRes.data.data;
                    _this.setData({
                      userInfo: updateUserInfoRes.data.data
                    })
                    wx.showToast({
                      title: '头像上传成功！',
                    })
                  }else {
                    wx.showToast({
                      title: updateUserInfoRes.data.description,
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  // 我的发布量
  getPublishData() {
    if (!this.data.isLogin) {
      this.toLogin();
      return;
    }
    let _this = this;
    app.request({
      url:  app.globalData.baseUrl + '/arcticle/arcticleList',
      method: 'GET',
      data: {
        isMy: true,
        // ReadCount: true,
        // CollectCount: true,
      },
      success(res) {
        // console.log(res)
        _this.setData({
          publishCount: res.recordCount
        })
      }
    })
  },
  // 我的收藏量
  getCollectData() {
    if (!this.data.isLogin) {
      this.toLogin();
      return;
    }
    let _this = this;
    app.request({
      url:  app.globalData.baseUrl + '/arcticle/collectList',
      method: 'GET',
      success(res) {
        // console.log(res)
        _this.setData({
          collectCount: res.recordCount,
        })
      }
    })
  },
})
