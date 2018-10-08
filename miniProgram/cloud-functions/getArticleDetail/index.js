// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const collection = db.collection('nb_arcticles');

// 云函数入口函数
/**
 * [main 获取文章详情]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  id 文章id    
 */
exports.main = async (event, context) => {
 	let { id } = event;

 	if(!id && id !== 0) {
 		//格式化返回数据
	  const { result } = await cloud.callFunction({
	  	name:'response',
	  	data:{
	  		code:21,
	  		description:'文章id为空',
	  	}
	  })

	  return result;
 	}


 	//请求数据
 	let { data } = await collection.where({
 		_id:id
 	}).get();

 	if(data.length < 1) {
 		//格式化返回数据
	  const { result } = await cloud.callFunction({
	  	name:'response',
	  	data:{
	  		code:21,
	  		description:'未查到相关文章',
	  	}
	  })

	  return result;
 	}


 	//格式化返回数据
  const { result } = await cloud.callFunction({
  	name:'response',
  	data:{
  		code:200,
  		data:data[0]
  	}
  })

  return result;
}
