const app = getApp();
var { dateFormat } = require('../../../noven/utils/dateUtil');

Page({
  data:{
    sysType:48,
    type:1,
    dataList:[],
    defaultUrl:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    isOpenEdit: false,

  },
  onLoad(options) {
    this.setData({
      sysType:app.globalData.sysType,
      type:options.type
    })

    this.getDataList(options.type) 
  },

  onPullDownRefresh(){
    this.getDataList(this.data.type);
  },

  /**
   * [getDataList 获取文章列表]
   * @Author   罗文
   * @DateTime 2018-09-27
   * @return   {[type]}   [description]
   */
  getDataList(type) {
    app.callCloudFunction({
      // 要调用的云函数名称
      name: 'getArticleList',
      // 传递给云函数的event参数
      data: {
        isMy: type == 1 ? true : false,
        isCollect: type == 2 ? true : false,
      }
    }).then(res => {
      res.data = res.data.map(item => {
        item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd HH:mm:ss');
        item.selected = false;
        return item;
      })

      this.setData({
        dataList:res.data,
        isOpenEdit:false
      })
    }).catch(err => {
      app.showToast(err.description,2);
    }).then(()=>{
      wx.stopPullDownRefresh();
    })
  },

  handleArticleClick({ currentTarget:{dataset:{ id , index }}}) {
    if( this.data.isOpenEdit ) {
      //如果是正在操作，就勾选或取消当前项
      let current = this.data.dataList[index];
      current.selected = !current.selected;

      this.setData({
        dataList: this.data.dataList
      })
    }else {
      app.goTo({
        path:'/pages/article/articleDetail/articleDetail',
        query:{
          id,
        }
      });
    }
  },
   
  //长按事件，触发删除操作
  itemLongPress() {
    if( this.data.isOpenEdit ) return;

    this.setData({
      isOpenEdit:true
    })
  },

  //全选
  selectAll() {
    let dataList = this.data.dataList.map( item => {
       item.selected = true;
       return item
    })

    this.setData({
      dataList
    })
  },

  //取消
  cancel() {
    let dataList = this.data.dataList.map( item => {
       item.selected = false;
       return item
    })

    this.setData({
      isOpenEdit:false,
      dataList
    })
  },

  //删除操作
  deleteAction() {
    let ids = [];
    this.data.dataList.forEach( item => {
      if( item.selected ) ids.push(item._id);
    })

    console.log(ids);
    if( ids.length < 1) {
       app.showToast('未选择删除文章',2) 
       return
    }

    app.showModal({
      title:'提示',
      content:'确定删除选中文章？',
    })
    .then(()=>{
      wx.showLoading({
        title:'正在删除',
        mask:true
      })
      //删除文章
      return app.callCloudFunction({
        name:'deleteArticle',
        data:{
          ids
        }  
      })
    })
    .then( res => {
      return app.showToast('删除成功')
    })
    .then(() => {
      //这里本来应该调用this.getDataList，但是性能不太好，就直接删除本地了
      //移除本地
      this.data.dataList.forEach( (item,index) => {
        if( item.selected ) this.data.dataList.splice(index,1)
      })

      this.setData({
        dataList:this.data.dataList,
        isOpenEdit:false
      })
    })
    .catch((err)=>{
      console.log(err)
      app.showToast(err.description,2)
    })
  },


  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})