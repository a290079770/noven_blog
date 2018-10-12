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


module.exports = {
  Storage
}