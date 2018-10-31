const app = getApp();
var { Storage } = require('../../noven/storage');

Page({
  data:{
    pageTitle:'',
    statusBarHeight:0,
    titleBarHeight:0,
    text:'',
    picsList:[],
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


  /**
   * [uploadPic 上传意见照片]
   * @Author   罗文
   * @DateTime 2018-09-29
   * @return   {[type]}   [description]
   */
  uploadPic() {
    let _this = this;
    
    app.uploadImgCloud(true)
    .then(res =>{
      let { picsList } = this.data;
      picsList.push(res);
      this.setData({
        picsList
      })

      // app.showToast('上传成功');
    })
    .catch(err => {
      console.log(err);
      app.showToast(err.description,2);
    })

  },

  //预览意见图
  previewPic({ currentTarget: {dataset: { index }}}) {
    let { picsList } = this.data;
    wx.previewImage({
      urls:picsList,
      current:picsList[index]
    })
  },

  /**
   * [closePic 关掉一张图片]
   * @Author   罗文
   * @DateTime 2018-10-26
   * @return   {[type]}   [description]
   */
  closePic({ currentTarget: {dataset: { index }}}) {
    let { picsList } = this.data;
    picsList.splice(index,1);

    this.setData({
      picsList
    })
  },

  //提交文章的编辑
  sumbitAction() {
    let { text , picsList } = this.data;

    if(!text) {
      app.showToast('说点什么吧',2)
      return;
    }

    //进行微信内容敏感信息验证
    // app.callCloudFunction({
    //   name:'checkContentLegal',
    //   data:{
    //     content:text
    //   }
    // })
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log(err)
    //   app.showToast(err.description,2)
    // })
    // return;

    //先上传图片获取真实路径，再新增一份反馈
    new Promise((resolve,reject)=>{
      this.uploadFile(picsList,0,resolve,reject);
    })
    .then((newPicsList)=>{
      //保存数据
      wx.showLoading({
        title:'上传意见...',
        mask:true
      })

      return app.callCloudFunction({
        // 传递给云函数的event参数
        data: { 
          cloudFunc:'saveFeedBack',
          cloudData:{
            text,
            picsList:newPicsList
          }
        }
      })
    })
    .then((res)=> {
      //保存数据
      return app.showToast('谢谢反馈 ^_^')
    })
    .then(()=>{
      app.goBack();
    })
    .catch(err => {
      app.showToast(err.description,2);
    })

   
  },

  uploadFile(picsList,index,callbackResolve,callbackReject) {
    //如果走到最后一张+1了，返回完成
    if( index > picsList.length - 1) {
       callbackResolve(picsList);
       return;
    }

    new Promise( (resolve,reject) => {
      wx.showLoading({
        title:'正在上传第'+ (index + 1) +'张',
        mask:true
      })

      app.uploadFile(picsList[index],resolve,reject);
    })
    .then(res => {
      picsList[index] = res.data;
      this.uploadFile(picsList,++index,callbackResolve);
    })
    .catch(error => {
      app.showToast(err.description,2);
      callbackReject(error);
    })
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})