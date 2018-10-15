// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const collection = db.collection('nb_collections');

// 云函数入口函数
/**
 * [main 新增或取消收藏]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  id 文章id    
 * @neccessaryParam  isAdd true - 收藏  false - 取消    
 */
exports.main = async (event, context) => {
	 const { id , userInfo: { openId } , isAdd } = event;
	 let res;
	 //走到云函数的时候，都是已登录状态

	 //添加收藏和取消收藏，区别isAdd字段，如果为false或不传，则为取消
	 if(isAdd) {
	 	 //验证是否已经收藏过
	 	 const count = await collection.where({
	 	 	 CollectId:id,
	 	 	 CollectUser:openId
	 	 })
	 	 .count();

	 	 if(count.total > 0) return await setResponse(21,'您已经收藏过该文章了');

	 	 //添加收藏  CollectId  CollectTime  CollectUser:
	 	 res = await collection.add({
	 	 	 data:{
	 	 	 	 CollectId: id,
	 	 	 	 CollectTime: Date.now(),
	 	 	 	 CollectUser: openId,
	 	 	 }
	 	 })

	 }else {
	 	 //取消收藏
	 	 res = await collection.where({
	 	 	 CollectId:id,
	 	 	 CollectUser:openId
	 	 })
	 	 .remove();
	 }


	 //对应文章收藏量
	 const { stats: { updated } } = await db.collection('nb_arcticles')
			  .where({
			  	_id:id
			  }).update({
			    data: {
			    	CollectCount: isAdd ? _.inc(1) : _.inc(-1)
			    }
			  })

	 if(updated < 1) return await setResponse(21,'修改收藏量失败')

	 return await setResponse(200,'ok',res);
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