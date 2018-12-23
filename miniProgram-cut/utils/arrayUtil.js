module.exports = {
	/**
	 * [randomStr 获取指定长度的随机字符串]
	 * @Author   罗文
	 * @DateTime 2018-09-29
	 * @param    {[type]}   len [description]
	 * @return   {[type]}       [description]
	 */
	randomStr(len) {
		var preinstallStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-$';
		var str = '';

		for(var i = 0 ; i < len ; i ++) {
			 var random = Math.ceil(Math.random() * 64);
			 str += preinstallStr[random];
		}

		return str
	}
}