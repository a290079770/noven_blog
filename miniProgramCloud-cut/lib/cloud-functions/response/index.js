// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	//设置环境
  // env: 'test-e35d4b',
  env: 'product-e35d4b',
})

/**
 * [description 这个函数主要是接口的统一格式函数]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @param    {[type]}   event   [调用函数的参数，注意没有openId]
 * @return   {[type]}           [description]
 */
exports.main = async (event) => {
	const { code,description,data,recordCount } = event;
	let res = {
					code,
					success:code == 200,
					description: code == 200 ? 'ok' : description,
					data: code == 200 && data,
				}

	if(Array.isArray(data))	res.recordCount = recordCount;

	return res
}

