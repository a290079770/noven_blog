// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')


cloud.init({
	//设置环境
  // env: 'test-e35d4b',
  env: 'product-e35d4b',
})

/**
 * [main 上传文件]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  filePath 选择的文件临时路径
 * @neccessaryParam  type 文件类型 1 - 头像  2 - 文章封面  3 - banner
 */
exports.main = async (event, context) => {
	const { filePath,type = 1 } = event;

	let ext = filePath.slice(filePath.lastIndexOf('.'));
  const url = 'images/'+ randomStr(16) +'_photo_'+ Date.now() + ext;



	let rStream = await rp({
      method: 'GET',
      url: filePath
    }).then(function(body) {
      return body
    })
    .catch(function(err) {
      return err
    });


    let res = await cloud.uploadFile({
	    cloudPath: url,
	    fileContent: rStream,
	  })

		return await setResponse(200,'ok',rStream);
  // try{
  	
  // } catch (err) {
  // 	return await setResponse(21,err);
  // } 
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

/**
 * [getSliceStr 生成指定长度随机字符串]
 * @Author   罗文
 * @DateTime 2018-09-30
 * @param    {[Number]}   len [指定长度]
 * @return   {[type]}   [description]
 */
const randomStr = (len) => {
  var preinstallStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-$';
  var str = '';

  for(var i = 0 ; i < len ; i ++) {
     var random = Math.ceil(Math.random() * 64);
     str += preinstallStr[random];
  }

  return str
}