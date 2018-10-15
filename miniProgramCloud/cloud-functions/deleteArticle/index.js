// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const collection = db.collection('nb_collections');

// 云函数入口函数
/**
 * [main 删除文章]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  id 文章id    
 */
exports.main = async (event, context) => {
	return await setResponse(200,'ok');
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