const app = getApp();
var { Storage } = require('../../noven/storage');

Page({
  data:{
    pageTitle:'',
    statusBarHeight:0,
    titleBarHeight:0,
    text:'',
  },
  onLoad(options) {
    this.setData({
      pageTitle:'意见反馈',
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight'),
    })
  },

  textareaInput({ detail: { value } }) {
    this.setData({
      text:value
    });
  },

  //提交文章的编辑
  sumbitAction() {
    
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})