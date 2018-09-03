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
   * [goTo 跳转到各个页面。1 - 我的发布。2 - 我的收藏。3 - 修改昵称。4 - 修改简介 5 - 关于我们]
   * @Author   罗文
   * @DateTime 2018-08-22
   */
  goTo(e) {
    let type = e.currentTarget.dataset.type;

    switch (+ type) {
      case 1:
      case 2:
        app.goTo({
           path:'/pages/article/myList/myList',
           query:{
             type
           }
        })
        break;
      case 3:
      case 4:
        app.goTo({
           path:'/pages/updateInfo/updateInfo',
           query:{
             type
           }
        })
        break;

      case 5:
        app.goTo({
          path:'/pages/aboutus/aboutus'
        })
        break;      
      default:
        // statements_def
        break;
    }

  },

  //点击去登录
  headerClick(e) {
    let _id = e.target.id;

    if(_id == 'loginInfo') {
       app.goTo({
        path:'/pages/login/login'
       })
    }
  }

})
