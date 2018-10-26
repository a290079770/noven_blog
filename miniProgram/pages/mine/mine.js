const app = getApp();
var { dateFormat } = require('../../utils/dateUtil');
Page({
  data: {
    userInfo: null,
    isLogin: false,
    publishCount: 3,
    collectionCount: 1
  },
  onLoad: function () {
    
  },
  onShow() {
    //如果Storage中有值，且userInfo为null的时候，刷新用户
    var storageUesrInfo = wx.getStorageSync("userInfo");
    if (storageUesrInfo) {
      console.log(storageUesrInfo)
      this.setData({
        userInfo: storageUesrInfo,
        isLogin: true,
        ['userInfo.ThisTime']: dateFormat(storageUesrInfo.ThisTime, 'yyyy-mm-dd')
      })
    }
  },
  toLogin: function() {
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },
  goTo(e) {
    let type = + e.currentTarget.dataset.type;
    // console.log(type)
    if (!this.data.isLogin && (type === 1 || type === 2 || type === 3 || type === 4)) {
      wx.navigateTo({
        url: "/pages/login/login"
      })
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
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        _this.setData({
          ['userInfo.CoverUrl']: tempFilePaths
        })
      }
    })
  }
})
