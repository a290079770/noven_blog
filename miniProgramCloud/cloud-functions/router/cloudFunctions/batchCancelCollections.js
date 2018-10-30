


// 云函数入口函数
/**
 * [main 批量取消收藏]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  ids 文章id集合    
 */
module.exports = async (event, context) => {
	 const { db, ids , userInfo: { openId } } = event;
	 const collection = db.collection('nb_collections');
   const _ = db.command

	 let res;

	 if(!Array.isArray(ids) || ids.length < 1) return setResponse(21,'要删除收藏为空');
	 		
	 let {stats} = await collection
	 .where({
      CollectId: _.in(ids)
   })
   .remove()

   //删除后要批量更新对应文章 的收藏量
	 const { stats: { updated } } = await db.collection('nb_arcticles')
			  .where({
			  	_id:_.in(ids)
			  }).update({
			    data: {
			    	CollectCount:_.inc(-1)
			    }
			  })

	 if(updated < 1) return setResponse(21,'修改收藏量失败')

	 return setResponse(200,'ok',res);
}





function setResponse(code,description,data) {
  return {
    code,
    description,
    data
  }
}