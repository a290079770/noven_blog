// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//连接数据库
const db = cloud.database()
const collection = db.collection('nb_users')
/**
 * [main 获取文章列表]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam   userInfo  用户信息
 */
exports.main = async (event, context) => {
	//判断openId,如果数据库已经有该用户则修改，无则新增
	let userInfo = Object.assign(
			pick(event,[
				'avatarUrl',
				'city',
				'country',
				'gender',
				'language',
				'nickName',
				'province',
			]),
			{
				openId:event.userInfo.openId,
				brief:'',
				fileID:''
			}
	)

	//先查数据库有没有该数据
	let { data } = await collection
	.where({
		openId:userInfo.openId
	})
	.get()

	let dbUserInfo = null;

	if(data.length < 1) {
		//新增
		await collection
		.add({
			data:userInfo
		})

		dbUserInfo = userInfo;
	}else {
		dbUserInfo = data[0];
		//其实现在和微信本身的用户信息实现了分离，
		//所以每次登录不需要更新所有的用户信息，以我们的数据库为准
		// let { stats } = await collection
		// .where({
		// 	openId:userInfo.openId
		// })
		// .update({
		// 	data:userInfo
		// })

		// if(stats.update < 1) {
		// 	const { result } = await cloud.callFunction({
		//   	name:'response',
		//   	data:{
		//   		code:21,
		//   		description: '未更新到对应数据',
		//   	}
		//   })

		//   return result;
		// }
	}


	//格式化返回数据
  const { result } = await cloud.callFunction({
  	name:'response',
  	data:{
  		code:200,
  		data:dbUserInfo,
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
	let keys = Object.keys(obj);

	keysArr.forEach(key => {
		let isInclude = keys.includes(key);
		if(isInclude) newObj[key] = obj[key];
	})

	return newObj;
}