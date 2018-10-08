const app = getApp();
const { getLen , getSliceStr } = require('../../noven/utils/stringUtil');

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
  inputAction({ currentTarget : { dataset: { type } } , detail : { value }}) {
    //type 1 - 昵称输入    2 - 简介
    const { nickNameLen = 12, briefLen = 280 } = this.data;
    //获取当前长度
    const computedLen = getLen(value);
    //最后处理之后的长度
    let lastLen = computedLen; 

    if( type == 1 ) {
      if( computedLen > nickNameLen ) {
         this.setData({
           nickName: getSliceStr(value,nickNameLen)
         })
         lastLen = nickNameLen;
      }
    }else if( type == 2 ) {
      if( computedLen > briefLen ) {
        this.setData({
          brief: getSliceStr(value,briefLen)
        })

        lastLen = briefLen;
      }
    }

    this.setData({
      currentLen: lastLen
    })
  },


  /**
   * [getBLen 获取字符串length，中文占两个字符]
   * @Author   罗文
   * @DateTime 2018-09-30
   * @param    {[String]}   str [要计算的字符串]
   * @return   {[type]}       [description]
   */
  getLen(str) { 
    if (!str) return 0;  
    if (typeof str != "string"){    
      str += "";  
    } 
    return str.replace(/[^\x00-\xff]/g,"01").length;
  },

  /**
   * [getSliceStr 剪切字符串，需要计算中文长度]
   * @Author   罗文
   * @DateTime 2018-09-30
   * @return   {[type]}   [description]
   */
  getSliceStr(str,len) {
    let sum = 0;
    for (let i = 0 ; i < str.length ; i ++) {
      var c = str.charCodeAt(i);     //单字节加1      
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
        //单字节   
        sum ++;
      } else { 
        //双字节
        sum += 2;
      } 

      if( sum > len) {
        return str.slice(0,i);
        break;
      }
    }
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})