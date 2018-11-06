//index.js
var app = getApp();
var { Storage } = require('../../noven/storage');
var { dateFormat } = require('../../noven/utils/dateUtil');
//获取应用实例
Page({
  data: {
    titleImgUrl:'http://thyrsi.com/t6/394/1540276844x-1404793579.png',
    statusBarHeight:0,
    titleBarHeight:0,
    userInfo:{
      "avatarUrl": "https://7465-test-e35d4b-1257270679.tcb.qcloud.la/images/dundefinedpFsiV4jUXnB6t8_photo_1540889909762.jpg",
      "brief": "",
      "city": "绵阳",
      "country": "中国",
      "fileID": "",
      "gender": 1,
      "language": "zh_CN",
      "nickName": "Noven",
      "province": "四川"
    },

    date:dateFormat(Date.now(),'yyyy-mm-dd'),
  },

  onLoad() {
    this.setData({
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight')
    })
  },  


})
