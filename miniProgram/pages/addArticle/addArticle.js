// pages/aboutUs/aboutUs.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addArticle: {
      Title: '',
      Url: '',
      Brief: '',
      Content: []
    },
    conList: [],
    conIsArray: false,
    currentLength: {
      Title: 0,
      Brief: 0,
      imgDes: 0
    },
    hasStorageDetailData: false,
    clickAddParaBtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.addArticle.Content.length)
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
          conList: storageDetailData.Content
        })
      }
      wx.removeStorageSync("detailData");
    }
    // 从新增段落addPara处回到新增文章
  },
  /**
   * 生命周期函数--监听页面显示
   */

  onShow() {
    let editParaData = wx.getStorageSync('editParaData');
    if (!editParaData) return;
    //需要更新对应数组那项数据
    let { editIndex } = editParaData;
    //找到数组段落中对应那项
    let editItem = this.data.conList[editIndex];
    //判断这个段落是图片还是文本
    if (editItem.type == 'text') {
      this.setData({
        [`conList[${editIndex}].value`]: editParaData.editParaText,
      })
    }else {
      //图片
      this.setData({
        [`conList[${editIndex}].value`]: editParaData.editParaImg,
        [`conList[${editIndex}].desc`]: editParaData.editParaImgDesc,
      })
    }

    console.log(this.data.conList)
    wx.removeStorageSync('editParaData');
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
  // 移除封面
  removeCover() {
    this.setData({
      ['addArticle.Url']: ''
    })
  },
  editTextPara(e) {
    let index = e.currentTarget.dataset.index;
    let value = this.data.conList[index].value
    wx.setStorageSync('editParaData', {
      editParaText:value,
      editIndex:index
    })
    wx.navigateTo({
      url: '/pages/addArticle/addPara/addPara?addType=1&navigationBarTitle=修改文章段落'
    })
  },
  editImgPara(e) {
    let index = e.currentTarget.dataset.index;
    wx.setStorageSync('editParaData', {
      editParaImg: this.data.conList[index].value,
      editIndex: index,
      editParaImgDesc: this.data.conList[index].desc
    })
    wx.navigateTo({
      url: '/pages/addArticle/addPara/addPara?addType=2&navigationBarTitle=修改文章段落'
    })
  },
  addTextOrImg() {
    // console.log('addTextOrImg')
    this.setData({
      clickAddParaBtn: !this.data.clickAddParaBtn
    })
  },
  addTextParagraph() {
    let curLen = this.data.conList.length;
    this.setData({
      [`conList[${curLen}]`]: {
        value: '',
        type: 'text'
      }
    })
    
    wx.setStorageSync('editParaData', {
      editParaText: '',
      editIndex: this.data.conList.length - 1
    })

    wx.navigateTo({
      url: '/pages/addArticle/addPara/addPara?addType=1&navigationBarTitle=添加文章段落',
    })
  },
  addImgParagraph() {
    let curLen = this.data.conList.length;
    this.setData({
      [`conList[${curLen}]`]: {
        value: '',
        desc: '',
        type: 'img'
      }
    })

    wx.setStorageSync('editParaData', {
      editParaImg: '',
      editIndex: this.data.conList.length - 1,
      editParaImgDesc:''
    })
    wx.navigateTo({
      url: '/pages/addArticle/addPara/addPara?addType=2&navigationBarTitle=添加文章段落',
    })
  },
  // 点击新增或修改
  addOrEditArticle() {
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: '/pages/login/login'
      });
      return;
    }
    if (!this.data.addArticle.Title.replace(/ /g, '')) {
      wx.showToast({
        title: '标题不能为空！',
      })
      return;
    }
    if (this.data.conList.length < 1) {
      wx.showToast({
        title: '内容不能为空！',
      })
      return;
    }
    let _this = this;
    let addParams = this.data.addArticle;
    addParams.Author = app.globalData.userInfo.NickName;
    addParams.Content = JSON.stringify(this.data.conList)
    console.log(addParams)
    _this.data.hasStorageDetailData ? console.log("修改") : console.log('新增');
    app.request({
      url: app.globalData.baseUrl + '/arcticle/createOrUpdate',
      method: 'POST',
      data: addParams,
      success(res) {
        // console.log(res)
        if (_this.data.hasStorageDetailData) {
          wx.showToast({
            title: '修改成功！',
          })

          app.toDetails(addParams.Id, 3);
        } else {
          wx.showToast({
            title: '新增成功！',
          })

          app.toDetails(res, 3);
        }
      }
    })
  }
})