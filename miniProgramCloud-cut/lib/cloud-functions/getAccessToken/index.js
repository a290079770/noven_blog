// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init({
	//设置环境
  // env: 'test-e35d4b',
  env: 'product-e35d4b',
})
const db = cloud.database();
const collection = db.collection('nb_feedbacks');

// 云函数入口函数
/**
 * [main 获取access_token，该接口只能给其他云端函数调用]
 * @Author   罗文
 * @DateTime 2018-09-26
 */
exports.main = async (event, context) => {
   const appId = 'wx6a4441008b589a6d';
   const appSecret = '7929fc8bb460f0ad1d8d5b8dd92085ea';
   
   var res = await rp({
      method: 'get',
      uri: 'https://api.weixin.qq.com/cgi-bin/token',
      qs: {
        grant_type:'client_credential' ,
        appid:appId,
        secret:appSecret
      },//参数
      headers: {},//请求头
      json: true  //是否json数据
    }).then( body => {
      return body
    }).catch(err => {
      return err;
    })

   return res;
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