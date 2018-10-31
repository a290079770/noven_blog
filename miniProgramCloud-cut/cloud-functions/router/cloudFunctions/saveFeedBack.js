
// 云函数入口函数
/**
 * [main 新增意见反馈]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  ids 文章id集合    
 */
module.exports = async (event, context) => {
	 const { db , text, picsList , userInfo: { openId } } = event;
	 const collection = db.collection('nb_feedbacks');
	 let res = 1;

	 //验证数据合法性
	 if( !text ) return setResponse(21,'意见不能为空');

	 //存数据库
	 try {
	 	 await collection.add({
	 	 	 data:{
	 	 	 	 text,
	 	 	 	 picsList,
	 	 	 	 openId
	 	 	 }
	 	 })
	 	 return setResponse(200,'ok');
	 }catch(e) {
	 	 return setResponse(21,e);
	 }
}




function setResponse(code,description,data) {
  return {
    code,
    description,
    data
  }
}