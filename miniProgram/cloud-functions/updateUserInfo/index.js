// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//连接数据库
const db = cloud.database()
const _ = db.command
const collection = db.collection('nb_users')
/**
 * [main 更新用户某些字段]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @possibleParam avatarUrl  头像
 * @possibleParam nickName  昵称
 * @possibleParam brief  简介
 */

exports.main = async (event, context) => {
	//允许修改的字段名
	let canUpdate = ['avatarUrl','nickName','brief'];
	let updateObj = pick(event,canUpdate);

	if(Object.keys(updateObj).length < 1) {
		//没有可修改项
		const { result } = await cloud.callFunction({
	  	name:'response',
	  	data:{
	  		code:21,
	  		description:'只能修改头像、昵称、简介',
	  	}
	  })

	  return result;
	}

	let obj = {};

	for(let k in updateObj) {
		obj[k] = _.set(updateObj[k])
	}

  //更新用户信息
  const { stats:{updated}} = await collection
									  .where({
									  	openId : event.openId
									  }).update({
									    data: obj
									  })

	if(updated < 1) {
		//未修改成功
		const { result } = await cloud.callFunction({
	  	name:'response',
	  	data:{
	  		code:21,
	  		description:'未修改任何数据',
	  	}
	  })

	  return result;
	}

	//格式化返回数据
  const { result } = await cloud.callFunction({
    name:'response',
    data:{
  		code:200,
  		data:'修改成功'
  	}
  })

  return result;
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

	keysArr.forEach(key => {
		newObj[key] = obj[key];
	})

	return newObj;
}