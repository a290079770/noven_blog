var { dateFormat } = require('../../../noven/utils/dateUtil');
const { Storage } = require('../../../noven/storage')
var app = getApp();

Page({
  data: {
    id:null,
    article:'',
    hasView: wx.getStorageSync('hasView'),   // 0 - 否    1 - 是
    sysType:48,
    detail:null,
    previewUrls:[],  //存放页面预览图片数组
    hasCollect:false,
    collecting:false,   //拦截连续点击
    isEditTap: false, //是否点击了编辑按钮
    isCurrentAuthor:false //当前用户是否是本文的作者
  },
  onLoad: function ({ id }) {
    //获取用户是否第一次进入这个页面
    this.setData({
      sysType:app.globalData.sysType,
      id,
    })

    this.getDetail(id)
  },

  onPullDownRefresh(){
    this.getDetail(this.data.id);
  },

  onShareAppMessage: function (res) {
    return {
      title: this.data.detail.Title,
      path: '/pages/article/articleDetail/articleDetail?id=' + this.data.id,
      imageUrl: this.data.detail.Url
    }
  },


  getDetail(id) {
    if(!id) {
      app.showToast('文章id为空',2);
      return 
    }
    app.callCloudFunction({
      // 要调用的云函数名称
      name: 'getArticleDetail',
      // 传递给云函数的event参数
      data: {
        id
      }
    }).then(res => {
       console.log(res.data)
       let { CreatTime , Url , Content , AuthorId} = res.data;
       //处理下时间
       CreatTime = dateFormat(CreatTime,'yyyy-mm-dd');

       //收集可预览图片
       let previewUrls = [];
       if( Url ) previewUrls.push( Url );
       Content.forEach( item => {
        if( item.type == 'img' && item.value ) previewUrls.push( item.value );
       })

       //判断当前文章是不是登录用户写的，如果是，则显示编辑按钮
       const { userInfo } = app.globalData;

       this.setData({
         detail: res.data,
         hasCollect: res.data.hasCollect || false,
         previewUrls,
         isCurrentAuthor: userInfo && userInfo.openId && userInfo.openId == AuthorId
       })

    }).catch(err => {
      console.log(err)
      app.showToast(err.description,2);
    })
  },



  //添加或取消收藏
  addOrCancelCollection() {
    //验证登录状态
    if(!app.globalData.isLogin) {
       //去登录
       app.goTo({
        path:'/pages/login/login'
       })

       return;
    }

    //发起操作
    if(this.data.collecting) {
      app.showToast('操作过于频繁',2);
      return;
    }

    this.setData({
      collecting:true
    })

    let hasCollect = this.data.hasCollect;

    let isAdd = hasCollect ? false : true;

    this.setData({
      hasCollect: !hasCollect
    })

    app.callCloudFunction({
      name:'addOrCancelCollection',
      data:{
        isAdd,
        id:this.data.id
      }
    })
    .then(res => {
      console.log(res)
      let add = isAdd ? 1 : -1;

      this.setData({
        collecting:false,
        ['detail.CollectCount']: + this.data.detail.CollectCount + add
      })
    }).catch(err => {
      console.log(err)
      app.showToast(err.description,2);
      this.setData({
        hasCollect,
        collecting:false
      })
    })
  },

  //点击去编辑操作
  toEditAction() {
    //直接把当前数据写入到Storage中，编辑页直接取
    Storage.set('previewArticleData',this.data.detail)
    .then(() => {
      app.goTo({
        path:'/pages/addArticle/index/addIndex'
      })
    })
  },

  //点击去删除操作
  deleteAction() {
    app.showModal({
      title:'提示',
      content:'确定删除该文章？',
    })
    .then(()=>{
      //删除文章
      return app.callCloudFunction({
        name:'deleteArticle',
        data:{
          ids: [this.data.detail._id]
        }  
      })
    })
    .then( res => {
      console.log(res)
      return app.showToast('删除成功')
    })
    .then(() => {
      app.goTo({
        path:'/pages/article/myList/myList?type=1'
      });
    })
    .catch((err)=>{
      console.log(err)
      app.showToast(err.description,2)
    })
  },

  //点击内容区的图片，可以预览图片
  previewImage({ target:{ dataset } }) {
    const { type, src } = dataset;
    if( !type || type !=='img') return;

    wx.previewImage({
      current:src,
      urls:this.data.previewUrls
    })
  },

  //打开或者关闭编辑按钮组
  openEditBtns() {
    this.setData({
      isEditTap: !this.data.isEditTap
    })
  },
  
  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }



})
