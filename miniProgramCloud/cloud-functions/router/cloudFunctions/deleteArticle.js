
// 云函数入口函数
/**
 * [main 删除文章]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam Array ids 要删除的文章id集合    
 */
module.exports = async (event, context) => {
	const { db , ids } = event;

  const collection = db.collection('nb_arcticles');
  const _ = db.command

	if( !ids || !Array.isArray(ids) || ids.length < 1 ) return setResponse(21,'文章id为空'); 

  try {
    const res = await collection.where({
      _id:_.in(ids)
    })
    .remove();

    //同时移除nb_collections表对应的数据
    const collectionRes = await db.collection('nb_collections').where({
      CollectId:_.in(ids)
    })
    .remove();

    return setResponse(200,'ok',res);
  } catch(e) {
    return setResponse(21,'服务端错误');
  }
}


function setResponse(code,description,data) {
  return {
    code,
    description,
    data
  }
}