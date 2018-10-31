// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init({
	//设置环境
  // env: 'test-e35d4b',
  env: 'product-e35d4b',
})

const db = cloud.database();

// 云函数入口函数
/**
 * [main 验证内容合法性,目前只能检测文本！！！图片需要formdata]
 * @Author   罗文
 * @DateTime 2018-09-26
 */
exports.main = async (event, context) => {
   let { content } = event;

   if( !content ) return await setResponse(21,'未获取到文本');
   
   let { result:{ access_token } } = await cloud.callFunction({
      name:'getAccessToken',
   })

   if(!access_token) return await setResponse(21,'获取access_token失败');

   var { errcode , errmsg } = await rp({
        method: 'post',
        uri: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='+access_token,
        body: {
          content
        },//参数
        json: true  //是否json数据
      }).then( body => {
        return body
      }).catch(err => {
        return err;
      })

   if(errcode === 0 ) {
   	  //验证通过
   	  return await setResponse(200,'验证通过');
   }else if(errcode == 87014) {
   	  //违法信息
   	  return await setResponse(21,'匹配到违法信息');
   }else {
   	  //其他错误
   	  return await setResponse(21, errmsg);
   }    
}




async function setResponse(code,description,data) {
  let req = {
    code
  }

  code == 200 ? (req.data = data) : (req.description = description)

  //格式化返回数据
  const { result } = await cloud.callFunction({
    name:'response',
    data:req
  })

  return result;
}