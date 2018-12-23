// pages/addArticle/addPara/addPara.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    paraText: '',
    paraImg: '',
    paraImgDesc: '',
    lenOfParaImgDesc: 0,
    editIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let editParaData = wx.getStorageSync('editParaData');
    if (!editParaData) {
      wx.showToast({
        title: '所需数据有误',
      })
      return;
    }

    if (options.addType == 1) {
      this.setData({
        type: options.addType,
        editIndex: editParaData.editIndex,
        paraText: editParaData.editParaText
      })
    } else if (options.addType == 2) {
      this.setData({
        type: options.addType,
        editIndex: editParaData.editIndex,
        paraImg: editParaData.editParaImg,
        paraImgDesc: editParaData.editParaImgDesc
      })
    }
    wx.setNavigationBarTitle({
      title: options.navigationBarTitle// 页面标题为路由参数
    })

    wx.removeStorageSync('editParaData');
  },
  // 获取输入框的值
  editParaText(e) {
    this.setData({
      paraText: e.detail.value
    })
  },
  // 新增或修改文章图片
  addOrEditParaImg() {
    console.log('新增或修改文章图片')
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
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
                paraImg: data.data.url.replace(/\\/g, '/')
              })
            }
          }
        })
      }
    })
  },
  // 获取输入框的值
  editParaImgDesc(e) {
    let inputLen = app.getCurrentLength(e.detail.value);
    this.setData({
      paraImgDesc: app.getSliceStr(e.detail.value, 190),
      lenOfParaImgDesc: inputLen > 190 ? 190 : inputLen,
    })
  },
  // 提交修改
  submitEdit() {
    if (this.data.editIndex !== null) {// 修改
      if(this.data.type == 1) {
          wx.setStorageSync('editParaData', {
            editParaText: this.data.paraText,
            editIndex: this.data.editIndex
          })
          
      } else if (this.data.type == 2) {
          wx.setStorageSync('editParaData', {
            editParaImg: this.data.paraImg,
            editIndex: this.data.editIndex,
            editParaImgDesc: this.data.paraImgDesc
          })
      }
        wx.navigateBack({
          delta:1
        })
      }
    }
})