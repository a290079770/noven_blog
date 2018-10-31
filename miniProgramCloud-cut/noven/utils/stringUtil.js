//字符串拓展工具方法
/** ------------------------  String  -------------------------- *



/**
 * [getBLen 获取字符串length，中文占两个字符]
 * @Author   罗文
 * @DateTime 2018-09-30
 * @param    {[String]}   str [要计算的字符串]
 * @return   {[type]}       [description]
 */
const getLen = (str) => { 
  if (!str) return 0;  
  if (typeof str != "string"){    
    str += "";  
  } 
  return str.replace(/[^\x00-\xff]/g,"01").length;
}

/**
 * [getSliceStr 剪切字符串，需要计算中文长度]
 * @Author   罗文
 * @DateTime 2018-09-30
 * @return   {[type]}   [description]
 */
const getSliceStr = (str,len) => {
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
}

/**
 * [getSliceStr 生成指定长度随机字符串]
 * @Author   罗文
 * @DateTime 2018-09-30
 * @param    {[Number]}   len [指定长度]
 * @return   {[type]}   [description]
 */
const randomStr = (len) => {
  var preinstallStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
  var str = '';

  for(var i = 0 ; i < len ; i ++) {
     var random = Math.ceil(Math.random() * 64);
     str += preinstallStr[random];
  }

  return str
}



module.exports = {
  //字符串操作
  getLen,  //获取字符串字节数，中文占两个字符
  getSliceStr, //剪切字符串，需要计算中文长度
  randomStr, //生成指定长度随机字符串
}