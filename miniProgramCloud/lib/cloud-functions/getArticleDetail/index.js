// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	//设置环境
  // env: 'test-e35d4b',
  env: 'product-e35d4b',
})
const db = cloud.database();
const collection = db.collection('nb_arcticles');
const _ = db.command

// 云函数入口函数
/**
 * [main 获取文章详情]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  id 文章id    
 */
exports.main = async (event, context) => {
 	let { id , userInfo:{ openId } } = event;

 	if(!id && id !== 0) {
	  return await setResponse(21,'文章id为空')
 	}


 	//请求数据
 	let { data } = await collection.where({
 		_id:id
 	}).get();

 	if(data.length < 1) {
	  return await setResponse(21,'未查到相关文章')
 	}else {
 		//点击量加1
 		const { stats: { updated } } = await collection
				  .where({
				  	_id:id
				  }).update({
				    data: {
				    	ReadCount:_.inc(1)
				    }
				  })

		if(updated < 1) {
			return await setResponse(21,'添加点击量失败')
		}		  
 	}

 	//获取该用户的收藏状态
 	
 	//如果用户不在系统中，就不理会
 	let { total: totalUser } = await db.collection('nb_users')
 			 .where({
		 	 	 openId
		 	 })
		 	 .count();
		 	 
	//系统有该用户
	if(totalUser > 0) {
		let { data : collecData } = await db.collection('nb_collections')
	 			 .where({
			 	 	 CollectId:id,
			 	 	 CollectUser:openId
			 	 })
			 	 .get();

		if( collecData.length > 0 )	data[0].hasCollect = true;
	}	 	 

  return await setResponse(200,'ok',data[0])
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
