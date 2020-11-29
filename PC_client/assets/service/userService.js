//用户相关所有api请求
import Vue from 'vue';


/**
 * [getUserDetail 获取用户详情]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  [String]  token  当前用户的token,默认在headers里自动携带上传
 * @neccessaryParam  [Number]  id  用户id，如果是管理员可以获取其他用户详情
 */
export const getUserDetail = function(id) {
  return Vue.prototype.$http.get('/user/detail',{
    params:{
      
    }
  })
}


/**
 * [getTimeLine 获取用户时间轴]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  [String]  token  当前用户的token,默认在headers里自动携带上传
 */
export const getTimeLine = function(id) {
  return Vue.prototype.$http.get('/other/timeLine',{
    params:{
      
    }
  })
}


/**
 * [updateUserInfo 修改用户信息]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  [String]  token  当前用户的token,默认在headers里自动携带上传
 * @possibleParam  [String]  NickName  昵称 
 * @possibleParam  [String]  CoverUrl  封面 
 * @possibleParam  [String]  Brief  简介 
 */
export const updateUserInfo = function(userInfo) {
  return Vue.prototype.$http.post('/user/updateUserInfo',{
    userInfo
  })
}


/**
 * [detailSimple 获取用户简易详情，只返回头像、昵称、简介]
 * @Author   罗文
 * @DateTime 2018-04-17
 * @neccessaryParam  [Number]  Id  评论要查询的用户id  
 * @return   [type]     [description]
 */
export const detailSimple = function(id) {
  return Vue.prototype.$http.get('/user/detailSimple',{
    params:{
      Id:id
    }
  })
}


/**
* [signout 退出登录]
* @return [type] [description]
*/
export const signOut = function(userInfo) {
  return Vue.prototype.$http.post('/user/signout')
}

/**
* [signout 退出登录]
* @return [type] [description]
*/
export const login = function(acountInfo) {
  return Vue.prototype.$http.post('/user/login',acountInfo)
}

