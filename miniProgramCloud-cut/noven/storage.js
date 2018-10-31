/*
对getStorage 和 setStorage的封装，主要返回promise结构
 */


let Storage = {
  get(key) {
    return new Promise((resolve,reject)=>{
      wx.getStorage({
        key,
        success(value) {
          return resolve(value);
        },
        fail(err) {
          return reject(err);
        } 
      })
    })
  },

  set(key,data) {
    return new Promise((resolve,reject)=>{
      wx.setStorage({
        key,
        data,
        success(value) {
          return resolve(value);
        },
        fail(err) {
          return reject(err);
        } 
      })
    })
  },

  remove(key) {
    return new Promise((resolve,reject)=>{
      wx.removeStorage({
        key,
        success(value) {
          return resolve(value);
        },
        fail(err) {
          return reject(err);
        } 
      })
    })
  },

  clear() {
    return new Promise((resolve,reject)=>{
      wx.clearStorage({
        success(value) {
          return resolve(value);
        },
        fail(err) {
          return reject(err);
        } 
      })
    })
  },

  getInfo() {
    return new Promise((resolve,reject)=>{
      wx.getStorageInfo({
        success(value) {
          return resolve(value);
        },
        fail(err) {
          return reject(err);
        } 
      })
    })
  },


  getSync(key) {
    //这里为了解决分享时，没有 statusBarHeight 和 titleBarHeight 导致样式问题
    let init = ['statusBarHeight','titleBarHeight'];
    if(init.includes(key)) {
      //先判断有没有
      let value = wx.getStorageSync(key);
      if(value) return value;

      //没有的话，重新设置并返回
      return setSysType(key);
    }

    return wx.getStorageSync(key);
  },

  setSync(key,data) {
    return wx.setStorageSync(key,data);
  },

  removeSync() {
    return wx.removeStorageSync(key);
  },

  clearSync() {
    return wx.clearStorageSync(key);
  },

  getInfoSync() {
    return wx.getStorageInfoSync();
  },
}


function setSysType(key) {
  console.log(1111)
  //同步获取设备型号,设置顶部位置
  let { model,statusBarHeight } = wx.getSystemInfoSync();

  let totalTopHeight = 68
  //安卓，刘海 - statusBarHeight 40   非刘海  20
  if (model.indexOf('iPhone X') !== -1 || statusBarHeight == 40) {
    totalTopHeight = 88
  } else if (model.indexOf('iPhone') !== -1) {
    totalTopHeight = 64
  }

  let computedBar = {
    statusBarHeight,
    titleBarHeight:totalTopHeight - statusBarHeight
  }

  Storage.setSync('statusBarHeight',statusBarHeight);
  Storage.setSync('titleBarHeight',totalTopHeight - statusBarHeight);

  return computedBar[key];
}


module.exports = {
  Storage
}