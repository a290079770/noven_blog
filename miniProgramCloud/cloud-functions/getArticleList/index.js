// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//连接数据库
const db = cloud.database()
const collection = db.collection('nb_arcticles')

/**
 * [main 获取文章列表]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam    
 * @possibleParam  ps  每页条数  
 * @possibleParam  cp  当前页  
 * @possibleParam  isMy  是否获取当前用户的文章列表，如果这个参数为true,则忽略isCollect
 * @possibleParam  count  是否是统计数量，如果有这个参数，则只返回符合规则的数量，不返回具体数据，目前只支持全部和isMy，不支持isCollect
 * @possibleParam  isCollect  获取当前用户的收藏文章列表  
 */
exports.main = async (event, context) => {
	const { ps = 10,cp = 1,isMy,isCollect,count } = event;

	let before = collection.skip((cp - 1) * ps).limit(ps);
	let list;
	let recordCount = { total:0 };

	if(count) {
		//只统计数量　
		if(isMy) {
			list = await before.where({
	      AuthorId: event.userInfo.openId,
	    }).count();
		}else {
			list = await before.count();
		}
	}else {
		//查具体数据
		if(isMy) {
		  list = await before.where({
	      AuthorId: event.userInfo.openId,
	    }).get();

	    recordCount = await collection.where({
	      AuthorId: event.userInfo.openId,
	    }).count();

		}else {
			if(isCollect) {
				//此时需要去收藏的集合中获取当前用户所有收藏
				let collect = db.collection('nb_collections').skip((cp - 1) * ps).limit(ps);

				res = await cloud.callFunction({
					name:'getCollectList',
					data:{
						openId:event.userInfo.openId,   //被调的云函数获取不到openId
						ps,
						cp,
					}
				}) 

				list = res.result;
				recordCount = { total: list.recordCount };
			}else {
				//查询所有
				list = await before.get();
				// 取出集合记录总数
	 		  recordCount = await collection.count();
			}
		}

	}

	//格式化返回数据
  const { result } = await cloud.callFunction({
  	name:'response',
  	data:{
  		code:200,
  		data:list.data || list.total,
  		recordCount:recordCount.total
  	}
  })

  return result;
}