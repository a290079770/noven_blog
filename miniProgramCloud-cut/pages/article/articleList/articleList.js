var app = getApp();
var { dateFormat } = require('../../../noven/utils/dateUtil');
const { Storage } = require('../../../noven/storage')

Page({
  data: {
    hotArticleList:[
      {
      	isSkeleton:true
      },
      {
        isSkeleton:true
      },
    ],
    titleImgUrl:'../../../images/articlelist.png',
    statusBarHeight:0,
    titleBarHeight:0,

    activeIndex: 0,  //当前列表的索引  0 - 最新  1 - 精选   2 - 热门
    isShowScrollTop:false,
    ps:5,  //分页参数，下拉加载更多
    cp:1,
    total:0,
  },
  onLoad: function (options) {
    const { type } = app.globalData.tabBarData;
    //获取用户是否第一次进入这个页面
    this.setData({
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight'),
    })

    this.resetData(type,false);
  },

  onShow() {
    //每次一进入当前页面，检测是否需要刷新
    //触发刷新的操作 - 新增文章，删除文章，修改文章
    let articleHasUpdate = Storage.getSync('articleHasUpdate');

    if(articleHasUpdate && articleHasUpdate === true) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
      this.resetData(0);
      Storage.remove('articleHasUpdate');
      return;
    } 
    

    const { type } = app.globalData.tabBarData;
    //如果从首页过来，点击的类别和当前类别不一致，则从新请求
    if( type && type != this.data.activeIndex) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
      this.resetData(type);
      delete app.globalData.tabBarData.type;
    }
  },

  onPullDownRefresh(){
    this.resetData(this.data.activeIndex);
  },

  onReachBottom() {
    this.getDataList(this.data.activeIndex,true);
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
   * [resetData 重置页面数据，cp,total,activeIndex]
   * @Author   罗文
   * @DateTime 2018-10-24
   * @param    {[Number]}   activeIndex [当前活跃的tab]
   * @return   {[type]}               [description]
   */
  resetData(activeIndex,isShowLoading = true) {
    this.setData({
      activeIndex: + activeIndex || 0  , 
      cp:1,
      total:0
    })

    if(isShowLoading) wx.showLoading({ title : '加载中...',mask:true});
    this.getDataList(activeIndex);
  },

  /**
   * [getDataList 获取文章列表]
   * @param  {[Number]} index [当前请求的排序数据索引]
   * @param  {[Boolean]} isLoadMore [是否是加载更多操作]
   * @return {[type]}       [description]
   */
  getDataList(index = 0, isLoadMore = false) {
    if( index < 0 || index > 2) return;

    let { ps ,cp ,total } = this.data;
    //如果加载更多，则需要判断当前已加载数量是否已经超过了total
    if( isLoadMore && ps * cp >= total ) return;
    if( isLoadMore ) cp++;

    
    let order = [ 'newest' , 'choice', 'hot'];
    app.callCloudFunction({
      // 传递给云函数的event参数
      data: { 
        cloudFunc:'getArticleList',
        cloudData:{
          orderBy:order[index],
          ps,
          cp
        }
      }
    }).then(res => {
      console.log(res)
      res.data = res.data.map(item => {
        item.CreateTime = dateFormat(item.CreateTime, 'yyyy-mm-dd');
        return item;
      })

      let updateData = {
        total: res.recordCount,
        hotArticleList: isLoadMore ? [...this.data.hotArticleList, ...res.data] : res.data,
        cp: isLoadMore ? cp : 1,
        total: res.recordCount
      }

      this.setData(updateData);

    }).then(()=>{
      wx.stopPullDownRefresh();
      wx.hideLoading();
    }).catch(err => {
      app.showToast(err.description,2);
      wx.hideLoading();
    })
  },

  //改变当前活跃的na vba r
  changeNavAction({ currentTarget:{dataset:{ index }}}) {
    this.resetData(index);
  },

  //去搜索界面
  goSearch() {
    app.goTo({
      path:'/pages/search/search',
    });
  },


  //点击每个文章
  handleArticleClick({ currentTarget:{dataset:{ id = '' }}}) {
    app.goTo({
      path:'/pages/article/articleDetail/articleDetail',
      query:{
        id,
      }
    });
  },

  hideScrollToTop() {
    this.setData({
      isShowScrollTop:false
    });
  }

})
