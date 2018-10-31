// 云函数入口文件
const cloud = require('wx-server-sdk');
/**
 * [main 上传用户头像]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  fileID 选择的文件id
 */
module.exports = async (event, context) => {
	const { db, fileID } = event;
  const _ = db.command
  const collection = db.collection('nb_users')

	if(!fileID) return setResponse(21,'文件Id不能为空')

	//获取文件数据，找到地址，绑定到用户头像栏
  const { fileList } = await cloud.getTempFileURL({
    fileList: [fileID],
  })

  //获取到url
  let url = fileList[0]['tempFileURL'];

  return setResponse(200,'ok',url)
}


function setResponse(code,description,data) {
  return {
    code,
    description,
    data
  }
}