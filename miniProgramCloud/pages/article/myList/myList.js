const app = getApp();
var { dateFormat } = require('../../../noven/utils/dateUtil');
const { Storage } = require('../../../noven/storage')
Page({
  data:{
    statusBarHeight:0,
    titleBarHeight:0,
    type:1,  //1 - 我的发布   2 - 我的收藏
    dataList:[],
    defaultUrl:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    isOpenEdit: false,
    hasGotData: false,
    isShowScrollTop:false,
  },
  onLoad(options) {
    this.setData({
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight'),
      type:options.type
    })

    this.getDataList(options.type) 
  },

  onPullDownRefresh(){
    this.getDataList(this.data.type);
  },

  onPageScroll({ scrollTop }) {
    if( scrollTop > 500 && !this.data.isShowScrollTop) {
      this.setData({
        isShowScrollTop:true
      });
    }else if(scrollTop <= 500 && this.data.isShowScrollTop) {
      this.setData({
        isShowScrollTop:false
      });
    }
  },

  /**
   * [getDataList 获取文章列表]
   * @Author   罗文
   * @DateTime 2018-09-27
   * @return   {[type]}   [1 - 我的发布    2 - 我的收藏]
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
      console.log(res)
      res.data = res.data.map(item => {
        item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd HH:mm:ss');
        item.selected = false;
        return item;
      })

      this.setData({
        dataList: res.data,
        isOpenEdit: false,
        hasGotData: true
      })
    }).catch(err => {
      console.log(err)
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

  /**
   * [deleteAction 删除操作]
   * @Author   罗文
   * @DateTime 2018-10-24
   * @param    {[Number]}   type [1 - 删除我的文章   2 - 删除我的收藏]
   * @return   {[type]}        [description]
   */
  deleteAction() {
    let ids = [];
    this.data.dataList.forEach( item => {
      if( item.selected ) ids.push(item._id);
    })

    if( ids.length < 1) {
       app.showToast('未选择删除文章',2) 
       return
    }

    //获取type
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
        name: this.data.type == 1 ? 'deleteArticle' : 'batchCancelCollections',
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
      this.setData({
        dataList:this.data.dataList.filter( item => !ids.includes(item._id)),
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
  },

  hideScrollToTop() {
    this.setData({
      isShowScrollTop:false
    });
  }
})