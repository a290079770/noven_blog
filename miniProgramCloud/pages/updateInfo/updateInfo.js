const app = getApp();
const { getLen , getSliceStr } = require('../../noven/utils/stringUtil');
const { Storage } = require('../../noven/storage'); 

Page({
  data:{
    sysType:48,
    type:3,  //3 - 修改昵称。 4 - 修改简介
    nickName: '',
    nickNameLen:12,
    brief:'',
    briefLen: 280,
    currentLen:0,
  },
  onLoad(options) {
    console.log(app.globalData.userInfo)
    this.setData({
      sysType:app.globalData.sysType,
      type:options.type,
      nickName:app.globalData.userInfo.nickName,
      brief:app.globalData.userInfo.brief,
      currentLen: options.type == 3 ? getLen(app.globalData.userInfo.nickName) : getLen(app.globalData.userInfo.brief)
    })
  },

  /**
   * [inputAction 输入事件]
   * @Author   罗文
   * @DateTime 2018-09-30
   * @return   {[type]}   [description]
   */
  inputAction({ detail : { value } }) {
    //type 3 - 昵称输入    3 - 简介
    const { nickNameLen = 12, briefLen = 280 } = this.data;
    //获取当前长度
    const computedLen = getLen(value);

    console.log(computedLen)
    console.log(value)

    //最后处理之后的长度
    let lastLen = computedLen; 

    if( this.data.type == 3 ) {
      if( computedLen > nickNameLen ) {
        this.setData({
          nickName: getSliceStr(value,nickNameLen)
        })
        lastLen = nickNameLen;
      }else {
        this.setData({
          nickName:value
        })
      }
    }else if( this.data.type == 4 ) {
      if( computedLen > briefLen ) {
        this.setData({
          brief: getSliceStr(value,briefLen)
        })

        lastLen = briefLen;
      }else {
        this.setData({
          brief:value
        })
      }
    }

    this.setData({
      currentLen: lastLen
    })
  },

  //修改用户信息 3 - 修改昵称。 4 - 修改简介
  updateAction() {
    const type = this.data.type;
    const data = type == 3 ? { nickName : this.data.nickName} : { brief : this.data.brief };

    wx.showLoading();
    
    app.callCloudFunction({
      name:'updateUserInfo',
      data
    })
    .then(res => {
      app
      .showToast('修改成功')
      .then(() => {
        //更新globalData 和 Storage
        let newUserInfo = Object.assign({},app.globalData.userInfo,data);

        // 更新Storage和界面
        Storage
        .set('userInfo',newUserInfo)
        .then(() => {
           app.globalData.userInfo = newUserInfo;
           app.goBack();
        })

      })
    })
    .catch(err => {
      app.showToast(err.description,2);
    })
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})