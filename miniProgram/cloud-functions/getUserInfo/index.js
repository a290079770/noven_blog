// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//连接数据库
const db = cloud.database()
const collection = db.collection('nb_users')

/**
 * [main 获取用户详情]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam    
 */
exports.main = async (event, context) => {
	const { openId } = event.userInfo;

	//去数据库查询该用户
	let { data:arr } = await collection.where({
		openId
	})
	.get()

	//格式化返回数据
  const { result } = await cloud.callFunction({
  	name:'response',
  	data:{
  		code:200,
  		data:arr[0]
  	}
  })

  return result;
}