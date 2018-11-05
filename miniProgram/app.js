//app.js
App({
  globalData: {
    userInfo: null,
    isLogin: false,
    code: '',
    token: ''
  },

  onLaunch: function () {
    var storageUesrInfo = wx.getStorageSync("userInfo");
    if(storageUesrInfo) {
      this.globalData.userInfo = storageUesrInfo;
      this.globalData.isLogin = true;
      this.getCode();
    }
  },
  // 跳转到详情页面
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

    // console.log(this.globalData.token)
    delete options.success;
    wx.request({
      ...options,
      header: options.header || {
        token: this.globalData.token
      },
      success(res) {
        if (res.statusCode !== 200) {
          //此时wx.request返回失败
          wx.showToast({
            title: options.wxDescrition || '调取接口失败',
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
  },
  // 获取用户的code，登录博客管理系统
  getCode() {
    let _this = this;
    // 获取用户的code
    wx.login({
      success(wxRes) {
        // console.log(wxRes.code)
        // 登录博客管理系统
        wx.request({
          url: 'http://novenblog_api.com/user/login',
          method: 'POST',
          data: {
            Code: wxRes.code
          },
          success(loginRes) {
            let { data } = loginRes.data;
            // console.log(data)
            _this.globalData.token = data.token;
            // 如果用户不存在系统中，调用更新用户信息接口，将微信信息存入系统
            if (!data.isExist) {
              wx.request({
                url: 'http://novenblog_api.com/user/updateUserInfo',
                method: 'POST',
                data: {
                  token: data.token,
                  userInfo:{
                    NickName: _this.globalData.userInfo.nickName || '',
                    Sex: _this.globalData.userInfo.gender || 0,
                    CoverUrl: _this.globalData.userInfo.avatarUrl || '',
                    Age: 18,
                    Introduction: ""
                  }
                },
                success(updateUserInfoRes) {
                  console.log(updateUserInfoRes)
                  wx.setStorageSync('userInfo', updateUserInfoRes.data.data);
                  _this.globalData.userInfo = updateUserInfoRes.data.data;
                }
              })
              
            }else {
              // 如果用户存在系统中，将系统信息存入this.globalData.userInfo
              _this.globalData.userInfo = data;
              wx.setStorageSync('userInfo', data);
              // console.log(_this.globalData.userInfo)
            }
          }
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  // 获取字符当前长度
  getCurrentLength(str) {
    if (!str) return 0;
    if (typeof str != "string") {
      str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;
  },
  // 截取字符
  getSliceStr(str, len) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);     //单字节加1      
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        //单字节   
        sum++;
      } else {
        //双字节
        sum += 2;
      }

      if (sum > len) {
        return str.slice(0, i);
        break;
      }
    }
    return str;
  },
})