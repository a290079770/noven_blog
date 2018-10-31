
/**
 * [main 获取用户详情]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam    
 */
module.exports = async (event, context) => {
	const { db , userInfo:{ openId } } = event;
  const collection = db.collection('nb_users')

	//去数据库查询该用户
	let { data:arr } = await collection.where({
		openId
	})
	.get()

  return {
      code:200,
      data:arr[0]
   }
}