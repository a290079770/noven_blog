//index.js
var app = getApp();
var { Storage } = require('../../noven/storage')
//获取应用实例
Page({
  data: {
    titleImgUrl:'http://thyrsi.com/t6/394/1540276844x-1404793579.png',
    statusBarHeight:0,
    titleBarHeight:0,
    
  },

  onLoad() {
    this.setData({
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight')
    })
  },  


})
