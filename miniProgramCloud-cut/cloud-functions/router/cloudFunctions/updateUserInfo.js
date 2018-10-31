
/**
 * [main 更新用户某些字段]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @possibleParam avatarUrl  头像
 * @possibleParam nickName  昵称
 * @possibleParam brief  简介
 */
module.exports = async (event, context) => {

	const { db , userInfo:{ openId } } = event;
	const _ = db.command
  const collection = db.collection('nb_users')

	//允许修改的字段名
	let canUpdate = ['avatarUrl','nickName','brief'];
	let updateObj = pick(event,canUpdate);

	//没有可修改项
	if(Object.keys(updateObj).length < 1) return setResponse(21,'只能修改头像、昵称、简介');

	let obj = {};

	for(let k in updateObj) {
		obj[k] = _.set(updateObj[k])
	}

  //更新用户信息
  const { stats:{ updated }} = await collection
									  .where({
									  	openId
									  }).update({
									    data: obj
									  })

	if(updated < 1) {
		//未修改成功
	  return setResponse(21,'未修改任何数据');
	}

	//修改文章对应的数据
	//获取最新的用户信息
	let { data:[ newUserInfo ] } = await collection.where({openId}).get();

	const { stats } = await db.collection('nb_arcticles')
								  .where({
								  	AuthorId:openId
								  }).update({
								    data: {
								    	Author:_.set(updateObj.nickName),
								    	AuthorInfo:_.set(pick(newUserInfo,['avatarUrl','brief','gender','nickName']))
								    }
								  })

	//格式化返回数据
  return setResponse(200,'ok');
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