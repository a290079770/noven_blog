// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')
const path = require('path')
const request = require('request')


cloud.init()

/**
 * [main 上传文件]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  filePath 选择的文件临时路径
 * @neccessaryParam  type 文件类型 1 - 头像  2 - 文章封面  3 - banner
 */
exports.main = async (event, context) => {
	const { filePath,type } = event;

	if(!filePath || !type) {
		//格式化返回数据
	  const { result } = await cloud.callFunction({
	  	name:'response',
	  	data:{
	  		code:21,
	  		description:'未选择文件或类型',
	  	}
	  })

	  return result;
	}


	const fileStream = request(filePath);

  const saveRes = await cloud.uploadFile({
    cloudPath: 'demo.jpg',
    fileContent: fileStream,
  })

  

	//格式化返回数据
  const { result } = await cloud.callFunction({
  	name:'response',
  	data:{
  		code:200,
  		data:saveRes,
  	}
  })

  return result;
}