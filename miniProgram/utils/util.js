
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
 * [goTo 小程序跳转，区分tabbar与非tabbar]
 * @Author   罗文
 * @DateTime 2018-08-15
 * @param    {[Object]}   app       [小程序入口实例]
 * @param    {[Object]}   params    [跳转参数]
 * @param    {Boolean}  isReplace [是否是替换当前路径，用wx.redirectTo]
 * @return   {[type]}             [description]
 */
const goTo = (app,params = {},isReplace = false) => {
  let {path,query} = params;
  if(!path || path == '') {
    console.log('要跳转的path不能为空！');
    return
  }

  delete params.path;
  
  query = query || {};

  let tabBarArr = app.globalData.tabBar;
  let isInTabBar = false;

  for(let i = 0 ; i < tabBarArr.length ; i ++) {
     if(path.indexOf(tabBarArr[i]) !== -1) {
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
    //编码参数列表
    let paramsStr,tmp;
    tmp = Object.keys(query).map(( item,index )=> item + '=' + Object.values(query)[index]);
    paramsStr = tmp.join('&');

    if(isReplace) {
      wx.redirectTo({
        url:path + paramsStr
      });
    }else {
      wx.navigateTo({
        url:path + paramsStr
      });
    }
  }
}


module.exports = {
  formatTime: formatTime,
  goTo
}
