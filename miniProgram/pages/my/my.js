//index.js
var app = getApp();
//获取应用实例
Page({
  data: {
    titleImgUrl:'http://y.photo.qq.com/img?s=Qgk0irOPX&l=y.jpg',
    sysType:48
  },

  onLoad() {
    this.setData({
      sysType:app.globalData.sysType
    })
  },  

  /**
   * [updateInfo 跳转到修改用户信息页面]
   * @Author   罗文
   * @DateTime 2018-08-22
   * @return   {[type]}   [description]
   */
  updateInfo(e) {
    let type = e.currentTarget.dataset.type;

    app.goTo(app,{
       path:'/pages/updateInfo/updateInfo',
       query:{
       	 type
       }
    })
  }

})
