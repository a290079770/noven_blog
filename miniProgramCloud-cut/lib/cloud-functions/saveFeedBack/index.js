// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	//设置环境
  // env: 'test-e35d4b',
  env: 'product-e35d4b',
})
const db = cloud.database();
const collection = db.collection('nb_feedbacks');

// 云函数入口函数
/**
 * [main 新增意见反馈]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  ids 文章id集合    
 */
exports.main = async (event, context) => {
	 const { text, picsList , userInfo: { openId } } = event;
	 let res = 1;

	 //验证数据合法性
	 if( !text ) return await setResponse(21,'意见不能为空');

	 //存数据库
	 try {
	 	 await collection.add({
	 	 	 data:{
	 	 	 	 text,
	 	 	 	 picsList,
	 	 	 	 openId
	 	 	 }
	 	 })
	 	 return await setResponse(200,'ok');
	 }catch(e) {
	 	 return await setResponse(21,e);
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