// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//连接数据库
const db = cloud.database()
const _ = db.command
const collection = db.collection('nb_users')

/**
 * [main 上传用户头像]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  fileID 选择的文件id
 */
exports.main = async (event, context) => {
	const { fileID } = event;

	if(!fileID) {
		//格式化返回数据
    const { result } = await cloud.callFunction({
      name:'response',
      data:{
	  		code:21,
	  		description:'文件Id不能为空'
	  	}
    })

    return result;
	}


	//获取文件数据，找到地址，绑定到用户头像栏
  const { fileList } = await cloud.getTempFileURL({
    fileList: [fileID],
  })

  //获取到url
  let url = fileList[0]['tempFileURL'];

  //格式化返回数据
  const { result } = await cloud.callFunction({
    name:'response',
    data:{
  		code:200,
  		data:url
  	}
  })

  return result;
}