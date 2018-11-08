const app = getApp();
// pages/aboutUs/aboutUs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addArticle: {},
    conIsArray: false,
    currentLength: {
      Title: 0,
      Brief: 0,
      imgDes: 0
    },
    hasStorageDetailData: false,
    paragraph: '',
    imgDes: '',
    img: '',
    editPara: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let storageDetailData = wx.getStorageSync("detailData");
    if(storageDetailData) {
      console.log(storageDetailData);
      try {
        storageDetailData.Content = JSON.parse(storageDetailData.Content);
        
        console.log(Array.isArray(storageDetailData.Content))
      } catch (err) {
        console.log(Array.isArray(storageDetailData.Content));
      }
      wx.setNavigationBarTitle({
        title: options.title// 页面标题为路由参数
      })
      this.setData({
        addArticle: storageDetailData,
        conIsArray: Array.isArray(storageDetailData.Content),
        ['currentLength.Title']: app.getCurrentLength(storageDetailData.Title),
        ['currentLength.Brief']: app.getCurrentLength(storageDetailData.Brief),
        hasStorageDetailData: true,
      })
      if (this.data.conIsArray) {
        this.setData({
          editPara: storageDetailData.Content
        })
      }
      wx.removeStorageSync("detailData");
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取输入框的值
  inputTitleAction(e) {
    let inputLen = app.getCurrentLength(e.detail.value);
    this.setData({
      ['addArticle.Title']: app.getSliceStr(e.detail.value, 30),
      ['currentLength.Title']: inputLen > 30 ? 30 : inputLen,
    })
  },
  // 获取输入框的值
  inputBriefAction(e) {
    let inputLen = app.getCurrentLength(e.detail.value);
    this.setData({
      ['addArticle.Brief']: app.getSliceStr(e.detail.value, 280),
      ['currentLength.Brief']: inputLen > 280 ? 280 : inputLen,
    })
  },
  inputParaAction(e) {
    console.log(e.detail.value)
    if (this.data.conIsArray) {
      // 修改文本段落
      this.setData({
        paragraph: e.detail.value,
      })
    }else {
      // 新增文本段落
      this.setData({
        paragraph: e.detail.value,
      })
    }
  },
  inputImgDescAction(e) {
    let inputLen = app.getCurrentLength(e.detail.value);
    this.setData({
      imgDes: app.getSliceStr(e.detail.value, 190),
      ['currentLength.imgDes']: inputLen > 190 ? 190 : inputLen,
    })
  },
  // 上传封面
  updateCover() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        wx.uploadFile({
          url: app.globalData.baseUrl + '/images/uploadFile',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'fileData': 'test'
          },
          success(res) {
            let data = JSON.parse(res.data)
            console.log(data)
            wx.showToast({
              title: data.description,
            })
            if (data.code !== 200) {
              
            } else {
              _this.setData({
                ['addArticle.Url']: data.data.url.replace(/\\/g, '/')
              })
            }
          }
        })
      }
    })
  },
  addArticleImg() {
    console.log('新增或修改文章图片')
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        wx.uploadFile({
          url: app.globalData.baseUrl + '/images/uploadFile',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'fileData': 'test'
          },
          success(res) {
            let data = JSON.parse(res.data)
            console.log(data)
            wx.showToast({
              title: data.description,
            })
            if (data.code !== 200) {

            } else {
              _this.setData({
                img: data.data.url.replace(/\\/g, '/')
              })
            }
          }
        })
      }
    })
  },
  // 点击新增
  addOrEditArticle() {
    let _this = this;
    let addParams = this.data.addArticle;
    addParams.Author = app.globalData.userInfo.NickName;
    if (this.data.img) {
      addParams.Content = [];
      addParams.Content.push({
        type: "text",
        value: this.data.paragraph
      })
      addParams.Content.push({
        type: "img",
        value: this.data.img,
        desc: this.data.imgDes
      })
      addParams.Content = JSON.stringify(addParams.Content)
    }else {
      addParams.Content = this.data.paragraph;
    }
    // addParams = Object.assign()
    console.log(addParams)
    _this.data.hasStorageDetailData ? console.log("修改") : console.log('新增');
    app.request({
      url: app.globalData.baseUrl + '/arcticle/createOrUpdate',
      method: 'POST',
      data: addParams,
      header: {
        token: app.globalData.token
      },
      success(res) {
        console.log(res)
        if (_this.data.hasStorageDetailData) {
          wx.showToast({
            title: '修改成功！',
          })
        } else {
          wx.showToast({
            title: '新增成功！',
          })
        }
        
        app.toDetails(res);
      }
    })


  }
})