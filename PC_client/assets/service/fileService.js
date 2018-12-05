//文件相关所有api请求
import Vue from 'vue';

/**
 * [uploadImage 上传图片]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  [String]  token  当前用户的token,默认在headers里自动携带上传
 */
export const uploadImage = function() {
  return Vue.prototype.$http.post('/images/uploadFile',{
    
  })
}