import axios from './http.js'
import Vue from 'vue'

Vue.prototype.$http = axios;

export default {
  install(Vue, options) {
    /**
     * [setWindow 设置系统的宽高]
     * @Author   罗文
     * @DateTime 2017-11-13
     * @param    {[type]}   width  [宽度]
     * @param    {[type]}   height [高度]
     */
    Vue.prototype.setWindow = function(width,height) {
       
    }



  }
}
