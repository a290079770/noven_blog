//云函数配置文件
module.exports = {

	//文章接口
	createOrUpdateArticle:require('./cloudFunctions/createOrUpdateArticle'),  //新增或修改文章
	getArticleList:require('./cloudFunctions/getArticleList'),  //获取文章列表
	getArticleDetail:require('./cloudFunctions/getArticleDetail'),  //获取文章详情
	deleteArticle:require('./cloudFunctions/deleteArticle'),  //删除文章，批量删除

	//收藏接口
	getCollectList:require('./cloudFunctions/getCollectList'),  //获取收藏列表
	addOrCancelCollection:require('./cloudFunctions/addOrCancelCollection'),  //添加或者取消收藏
  batchCancelCollections:require('./cloudFunctions/batchCancelCollections'),  //批量删除用户收藏

  //用户接口
  createOrUpdateUser:require('./cloudFunctions/createOrUpdateUser'),  //新增或修改用户
  updateUserInfo:require('./cloudFunctions/updateUserInfo'),  //更新用户信息
  getUserInfo:require('./cloudFunctions/getUserInfo'),  //获取用户信息

  //其他接口
	uploadPhoto:require('./cloudFunctions/uploadPhoto'),  //根据fileId获取图片链接
	saveFeedBack:require('./cloudFunctions/saveFeedBack'),  //意见反馈

}