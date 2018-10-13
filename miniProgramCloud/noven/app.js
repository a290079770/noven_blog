var { randomStr } = require('../noven/utils/stringUtil')

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
 * [goBack 返回上几页]
 * @Author   罗文
 * @DateTime 2018-10-08
 * @param    {[Number]}   delta [要返回的页数]
 * @return   {[type]}         [description]
 */
const goBack = (delta) => {
  wx.navigateBack({
      delta
  })
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


/**
 * [callCloudFunction  封装调用云函数，附加系统参数,添加日志等,统一错误拦截等]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @param    {[type]}   params [description]
 * @return   {[type]}          [description]
 */
const callCloudFunction = (params) => {
  const systemInfo = {};

  //之所以要额外包装一层，主要是可能需要添加系统参数
  return wx.cloud.callFunction({
    ...systemInfo,
    ...params,
    // 要调用的云函数名称
    // name,
    // 传递给云函数的event参数
    // data
  }).then( res => {
     //这里面处理数据
     if(res.result.code == 200 ) {
        //这才是真正请求到了数据
        return Promise.resolve(res.result);
     }else {
        //这里是针对各种状态码的提示
        return Promise.reject(res.result);
     }
  }).catch((err)=> {
     return Promise.reject(err);
  })
}

/**
 * [showToast 显示弱提示]
 * @Author   罗文
 * @DateTime 2018-09-27
 * @param    {[String]}   title [提示文字]
 * @param    {[NUmber]}   type  [1 - 成功 2 - 失败 3 - loading]
 * @param    {[NUmber]}   duration  [持续时长]
 * @return   {[type]}         [description]
 */
const showToast = (title,type = 1,duration = 1500) =>{
  wx.hideLoading();

  return new Promise((resolve) => {
    title = title ? title : (type == 2 ? '异常错误':(type == 3 ? '请稍候...':'操作成功'));
    
    let option = {
      title,
      icon: type == 3 ? 'loading' : 'success',   //微信没有内置失败的图标，需要image字段支持
      duration,
    }

    if( type == 2 ) option.image = '/images/err.svg';

    wx.showToast(option)

    setTimeout(resolve,duration);
  })
}

/**
 * [showModal 显示弹出框]
 * @Author   罗文
 * @DateTime 2018-09-27
 * @param    {[Object]}   params  [参数]
 * @return   {[type]}         [description]
 */
const showModal = (params) =>{
  if( Object.prototype.toString.call(params) != '[object Object]' ) {
    showToast('参数错误',2)
    return;
  }

  delete params.success;
  delete params.fail;
  delete params.complete;

  return new Promise((resolve,reject) => {
    wx.showModal({
      ...params,
      success(res) {
        let { cancel , confirm } = res;

        if(cancel) reject();
        if(confirm) resolve();
      }
    })
  })
}

/**
 * [uploadImgCloud 上传图片操作]
 * @Author   罗文
 * @DateTime 2018-10-12
 * @return   {[type]}   [description]
 */
const uploadImgCloud = function () {
  return new Promise((resolve,reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        wx.showLoading({
          title:'上传中...',
          mask:true
        })

        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        let ext = tempFilePaths.slice(tempFilePaths.lastIndexOf('.'));

        const url = 'images/'+ randomStr(32) +'_photo' + ext;


        //上传文件到服务器
        wx.cloud.uploadFile({
          cloudPath: url,
          filePath: tempFilePaths, // 小程序临时文件路径
        })
        .then(res => {
          //获取到上传文件的fileID
          let { fileID } = res;
          return Promise.resolve(fileID);
        })
        .then( res =>{

          //根据文件id获取url
          callCloudFunction({
            name:'uploadPhoto',
            data: {
              fileID:res
            }
          })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            showToast('',2);
            reject(error);
          })

        })
        .catch(error => {
          showToast('',2);
          reject(error);
        })
        
      }
    })
  })
}


module.exports = {
  goToExec,
  goBack,
  headerClickExec,
  callCloudFunction,
  showToast,
  showModal,
  uploadImgCloud
}
