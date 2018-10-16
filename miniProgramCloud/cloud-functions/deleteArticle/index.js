// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const collection = db.collection('nb_arcticles');
const _ = db.command

// 云函数入口函数
/**
 * [main 删除文章]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam Array ids 要删除的文章id集合    
 */
exports.main = async (event, context) => {
	const { ids } = event;

	if( !ids || !Array.isArray(ids) || ids.length < 1 ) return await setResponse(21,'文章id为空'); 

  try {
    const res = await collection.where({
      _id:_.in(ids)
    })
    .remove();

    return await setResponse(200,'ok',res);
  } catch(e) {
    return await setResponse(21,'服务端错误');
  }
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