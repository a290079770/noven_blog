//app.js
App({
  globalData: {
    userInfo: null,
    isLogin: false
  },

  onLaunch: function () {
    
  },

  toDetails(articleId) {
    wx.navigateTo({
      url: "/pages/details/details?id=" + articleId
    })
  },

  //封装wx.request
  request(options) {
    let optionFunctions = {};
    const getFuncs = ['success','fail','complete'];

    Object.entries(options).forEach(([ key,value ]) => {
      //匹配对应的项
      //写法一
      // if (getFuncs.indexOf(key) !== -1) {
      //   optionFunctions[key] = value;
      // }

      //find - 只找匹配的一项，找不到返回undefine
      //写法二
      // let find = getFuncs.find(item => item == key);
      // if( find ) optionFunctions[key] = value;

      //includes - 是否包含某一项
      //写法三 
      // let isInclude = getFuncs.includes(key);
      // if (isInclude ) optionFunctions[key] = value;
    
      //写法四   filter 
      let filter = getFuncs.filter(item => item == key);
      if (filter.length > 0 ) optionFunctions[key] = value;
    })
    
    // for( let k in options) {
    //   if (getFuncs.indexOf(k) !== -1 ) {
    //     optionFunctions[k] = options[k];
    //   }
    // }

    delete options.success;
    wx.request({
      ...options,

      success(res) {
        if (res.statusCode !== 200) {
          //此时wx.request返回失败
          wx.showToast({
            title: option.wxDescrition || '调取接口失败',
          })
        } else {
          //表示接口已经调通，再根据接口返回数据，进行下一步验证
          let { data } = res;

          if (data.code !== 200) {
            //此时接口返回失败
            wx.showToast({
              title: data.description,
            })
          } else {
            //此时表示接口返回成功！
            // console.log(data)
            optionFunctions.success(data.data);
          }
        }
      }
    })
  }
})