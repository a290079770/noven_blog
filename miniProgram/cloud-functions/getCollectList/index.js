// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const collection = db.collection('nb_collections');


/**
 * [main 获取我的收藏列表]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam    
 * @possibleParam  ps  每页条数  
 * @possibleParam  cp  当前页  
 * @possibleParam  count  是否是统计数量，如果有这个参数，则只返回符合规则的数量，不返回具体数据
 */
exports.main = async (event, context) => {

	let { ps = 10, cp = 1 , count} = event;
	let openId = event.userInfo.openId || event.openId;
  let list;
  let res;

  if( count ) {
    list = await collection.where({
      CollectUser: openId,
    }).count();

    const { result } = await cloud.callFunction({
      name:'response',
      data:{
        code:200,
        data:list.total,
      }
    })

    res = result;
  }else {
    //此时需要去收藏的集合中获取当前用户所有收藏
    let collect = collection.skip((cp - 1) * ps).limit(ps);

    //这里只获取到了所有该用户的收藏记录，只包含了文章id
    //还需要根据每条收藏记录文章id查询文章表
   list = await collect.where({
      CollectUser: openId,
    }).get(); 

    //查询对应的文章
    let data = await getArticleList(list.data,db);

    // 取出当前用户收藏集合记录总数
    const recordCount = await collection.where({
      CollectUser: openId,
    }).count();

    //格式化返回数据
    const { result } = await cloud.callFunction({
      name:'response',
      data:{
        code:200,
        data,
        recordCount:recordCount.total,
      }
    })

    res = result;
  }

  return res;
}


async function getArticleList(arr,db) {

  let promiseList = [];

  for(let i = 0 ; i < arr.length ; i ++) {
      let collectId = arr[i].CollectId;
      let promise = db.collection('nb_arcticles').where({
        _id:collectId
      })
      .get()

      promiseList.push(promise)
  }  

  let dataList = await Promise.all(promiseList);

  let data = [];

  //整合成平级的数据
   dataList.forEach(item => {
      data = data.concat(item.data);
   })

  return data;
}
