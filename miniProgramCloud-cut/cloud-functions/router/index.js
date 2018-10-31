// 云函数入口文件
const cloud = require('wx-server-sdk');
const { response } = require('./cloudFunctions/response');
//获取所有的云函数
const cloudFuncs = require('./cloudFuncs.route');


cloud.init({
	//设置环境
  env: 'test-e35d4b',
  // env: 'product-e35d4b',
})

//连接数据库
const db = cloud.database()
// const collection = db.collection('nb_arcticles')

/**
 * [main 整个应用云函数路由函数，目的是解决环境切换时多个云函数必须单独上传的问题]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam [String] cloudFunc  云函数名称  
 * @possibleParam  data  附加请求数据  
 */
// 云函数入口函数
exports.main = async (event, context) => {
	let { cloudFunc , cloudData , userInfo} = event;

	//必须指定访问的云函数
	if(!cloudFunc) return await response(21,'云函数名为空');

	let newEvent = {
		userInfo,
		...cloudData,
		db
	};

  //将云函数需要的数据导传入
  let { code , description , data, recordCount } = await cloudFuncs[cloudFunc](newEvent);

  //格式化输出
  return response(code , description , data, recordCount );
}