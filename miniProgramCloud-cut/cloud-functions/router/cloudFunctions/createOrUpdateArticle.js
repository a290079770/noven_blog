/**
 * [main 新增和修改文章]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @possibleParam avatarUrl  头像
 * @possibleParam nickName  昵称
 * @possibleParam brief  简介
 */
module.exports = async (event, context) => {
	 let { db , userInfo: { openId }, detail } = event;
	 const _ = db.command
	 const collection = db.collection('nb_arcticles')

	 //拦截无数据
	 if(!detail || Object.keys(detail).length < 1 ) return setResponse(21, '文章数据为空');

	 //根据detail是否有 _id 字段区分新增和修改
	 let _id = detail._id;
	 if(!_id) {
	 	 //新增，添加Author，AuthorId，CollectCount，ReadCount，ThumbUrl字段
	 	 //先获取用户
	 	 //去数据库查询该用户
		 const { data:arr } = await db.collection('nb_users').where({
			 openId
	     })
		 .get()

		 if( arr.length < 1 ) return setResponse(21, '未获取到用户信息',event);

		 let user = arr[0];
	 	 
	 	 let supplement = {
	 	 	  Author:user.nickName,
	 	 	  AuthorId:openId,
	 	 	  AuthorInfo: pick(user,['avatarUrl','brief','gender','nickName']),
	 	 	  CollectCount:0,
	 	 	  ReadCount:0,
	 	 	  ThumbUrl:detail.Url
	 	 }

	 	 //新增操作
	 	 const { _id } = await collection.add({
	 	 	 data:Object.assign({},detail,supplement)
	 	 })

	 	 return setResponse(200, 'ok',_id);
	 }else {
	 	 delete detail._id;
		 //修改
	 	 const { stats } = await collection.where({
	 	 	 _id
	 	 })
	 	 .update({
	 	 	data:detail
	 	 })

	 	 if( stats < 1) return setResponse(21,'修改失败');

	 	 return setResponse(200, 'ok',_id);
	 }
}



function setResponse(code,description,data) {
  return {
    code,
    description,
    data
  }
}

/**
 * [pick 从对象中取出特定项，返回新对象]
 * @Author   罗文
 * @DateTime 2018-09-28
 * @param    {[Object]}   obj        [目标对象]
 * @param    {[Array]}   filtersArr [要筛选的键数组]
 * @return   {[type]}              [description]
 */
function pick(obj,keysArr) {
	let newObj = {};
	let keys = Object.keys(obj);

	keysArr.forEach(key => {
		let isInclude = keys.includes(key);
		if(isInclude) newObj[key] = obj[key];
	})

	return newObj;
}