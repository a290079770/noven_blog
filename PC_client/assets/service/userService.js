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