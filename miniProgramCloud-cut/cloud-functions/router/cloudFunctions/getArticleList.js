const getCollectList = require('./getCollectList');

/**
 * [main 获取文章列表]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam    
 * @possibleParam  event.db  数据库连接，只需要初始化一次  
 * @possibleParam  event.ps  每页条数  
 * @possibleParam  event.cp  当前页  
 * @possibleParam  event.isMy  是否获取当前用户的文章列表，如果这个参数为true,则忽略isCollect
 * @possibleParam  event.count  是否是统计数量，如果有这个参数，则只返回符合规则的数量，不返回具体数据，目前只支持全部和isMy，不支持isCollect
 * @possibleParam  event.isCollect  获取当前用户的收藏文章列表  
 * @possibleParam  event.keywords  查询文章关键字  
 */
module.exports = async (event) => {
	const { db, ps = 10,cp = 1,isMy,isCollect,count, orderBy = 'newest' ,keywords='' } = event;
	const collection = db.collection('nb_arcticles');

	const orders = [ 'newest' , 'hot', 'choice'];  //可接受的排序
	const orderBys = [ 'CreateTime' , 'ReadCount' , 'CollectCount']  //排序对应的映射
	let orderExec = orders.includes(orderBy) ? orderBys[orders.indexOf(orderBy)] : 'CreateTime'

	let before = collection.skip((cp - 1) * ps).limit(ps).orderBy(orderExec, 'desc')
	let list;
	let recordCount = { total:0 };

	let whereSql = {
		AuthorId: event.userInfo.openId,
	};
	if( keywords ) whereSql.Title = keywords;

	if(count) {
		//只统计数量　
		if(isMy) {
			list = await before.where(whereSql).count();
		}else {
			list = await before.count();
		}
	}else {
		//查具体数据
		if(isMy) {
		  list = await before.where(whereSql)
	    .get();

	    recordCount = await collection.where(whereSql).count();

		}else {
			if(isCollect) {
				//此时需要去收藏的集合中获取当前用户所有收藏
				let collect = db.collection('nb_collections').skip((cp - 1) * ps).limit(ps).orderBy(orderExec, 'desc');

				return await getCollectList({
					...event,
					db
				});

			}else {
				//查询所有
				delete whereSql.AuthorId;
				
				list = await before.where(whereSql).get();
				// 取出集合记录总数
	 		  recordCount = await collection.count();
			}
		}

	}

	// if( list.data ) {
	// 	list.data = list.data.map( item => {
	// 		delete item.Content;
	// 		return item;
	// 	})
	// }


  return {
  		code:200,
  		data:list.data || list.total,
  		recordCount:recordCount.total
  };
}

