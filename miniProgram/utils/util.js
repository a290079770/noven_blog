
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * [goToExec 小程序跳转的执行函数，区分tabbar与非tabbar]
 * @Author   罗文
 * @DateTime 2018-08-15
 * @param    {[Object]}   app       [小程序入口实例]
 * @param    {[Object]}   params    [跳转参数]
 * @param    {Boolean}  isReplace [是否是替换当前路径，用wx.redirectTo]
 * @return   {[type]}             [description]
 */
const goToExec = (app,params = {}) => {
  let {path,query,isReplace} = params;
  if(!path || path == '') {
    console.log('要跳转的path不能为空！');
    return
  }

  delete params.path;
  
  query = query || {};

  let tabBarArr = app.globalData.tabBar;
  let isInTabBar = false;

  for(let i = 0 ; i < tabBarArr.length ; i ++) {
     let lastPath = path.split('/').pop();

     if(lastPath == tabBarArr[i]) {
        isInTabBar = true;
        break;
     }
  }
 
  //跳转到tabbar,用 wx.switchTab({path:xxx}),且要用另外的方式传参
  if(isInTabBar) {
    //修改参数全局变量,传入了什么参数，就附加到全局的app.globalData.tabBarData身上，在目标页面也直接这样获取
    app.globalData.tabBarData = Object.assign({},query);

    //跳转到tab
    wx.switchTab({
      url:path
    });
  }else {
     console.log(11)
    //编码参数列表
    let paramsStr,tmp;
    tmp = Object.keys(query).map(( item,index )=> item + '=' + Object.values(query)[index]);
    paramsStr = tmp.join('&');
    let askparameter = paramsStr ? '?' :'';

    console.log('当前页面路径：  '+ path + askparameter + paramsStr)

    if(isReplace) {
      wx.redirectTo({
        url:path + askparameter + paramsStr
      });
    }else {
      wx.navigateTo({
        url:path + askparameter + paramsStr
      });
    }
  }
}



/**
 * [headerClickExec. 点击顶部自定义胶囊的两个按钮跳转执行函数]
 * @Author   罗文
 * @DateTime 2018-08-23
 * @param    {[Event]}   e   [事件对象]
 */
const headerClickExec = (e,app) => {
  let _id = e.target.id;

  if(_id == 'headerBtnLeftCont' || _id == 'headerBtnLeft') {
    wx.navigateBack({
      delta: 1
    })
  }else if(_id == 'headerBtnRightCont' || _id == 'headerBtnRight') {
    goToExec(app,{
      path:"/pages/index/index",
    });
  }
}


module.exports = {
  formatTime: formatTime,
  goToExec,
  headerClickExec
}
