/**
 * [description 这个函数主要是接口的统一格式函数]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @param    {[Number]}   code   [21 - 错误  200 - 成功]
 * @param    {[String]}   description   [描述]
 * @param    {[any]}   data   [任意数据]
 * @param    {[Number]}   recordCount   [如果data是数组，则该字段为数据的统计数量]
 * @return   {[type]}           [description]
 */
exports.response = (code,description,data,recordCount) => {
	let res = {
					code,
					success:code == 200,
					description: code == 200 ? 'ok' : description,
					data: code == 200 && data,
				}

	if(Array.isArray(data))	res.recordCount = recordCount;

	return res
}

