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
	  return await setResponse(21,'只能修改头像、昵称、简介');
	}

	let obj = {};

	for(let k in updateObj) {
		obj[k] = _.set(updateObj[k])
	}

  //更新用户信息
  const { stats:{ updated }} = await collection
									  .where({
									  	openId : event.openId
									  }).update({
									    data: obj
									  })

	if(updated < 1) {
		//未修改成功
	  return await setResponse(21,'未修改任何数据');
	}

	//判断是否有修改昵称，如果有，则需要同步到所有的文章
	if(Object.keys(updateObj).includes('nickName')) {
		const { stats } = await db.collection('nb_arcticles')
									  .where({
									  	AuthorId : event.openId
									  }).update({
									    data: {
									    	Author:_.set(updateObj.nickName)
									    }
									  })
	}

	//格式化返回数据
  return await setResponse(200,'ok');
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