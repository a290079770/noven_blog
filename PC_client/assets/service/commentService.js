//评论相关所有api请求
import Vue from 'vue';


/**
* [getCommentList 获取评论列表]
* @Author   罗文
* @DateTime 2018-09-26
* @neccessaryParam    
* @neccessaryParam  [Number]  type  评论类型，0 - 全部或不传  1 - 留言  2 - 文章  
* @neccessaryParam  [Number]  resourceId  要查询文章id下的所有评论 
* @possibleParam  [String]  keywords  搜索关键字  
* @possibleParam  [Number]  ps  每页条数  默认20 分页参数是针对顶层评论的
* @possibleParam  [Number]  cp  当前页  分页参数是针对顶层评论的
* 
*/
export const getCommentList = function(params) {
  return Vue.prototype.$http.get('/comment/getComments',{
    params
  })
}