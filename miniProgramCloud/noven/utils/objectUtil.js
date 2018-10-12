//对象拓展方法

/** ------------------------  Object  -------------------------- */

/**
 * [pick 从对象中取出特定项，返回新对象]
 * @Author   罗文
 * @DateTime 2018-09-28
 * @param    {[Object]}   obj        [目标对象]
 * @param    {[Array]}   filtersArr [要筛选的键数组]
 * @return   {[type]}              [description]
 */
const pick = (obj,keysArr) => {
  let newObj = {};
  let keys = Object.keys(obj);

	keysArr.forEach(key => {
		let isInclude = keys.includes(key);
		if(isInclude) newObj[key] = obj[key];
	})

  return newObj;
}



module.exports = {
  //object操作
  pick,  //从对象中取出特定项，返回新对象
}