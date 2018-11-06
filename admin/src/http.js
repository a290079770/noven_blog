/**
 * 统一配置axios
 * 使用qs.stringify解决axios跨域问题
 * 配置axios请求类型为post时，使用qs.stringify来实现跨域访问，以及每次请求携带token
 * 配置请求成功后res，实现诸如登录失败，登录超时，账户密码错误和请求错误等拦截器
 */
//整个大项目的api地址
// import {defaultUrl} from '../../config.js'
import axios from 'axios'
import qs from 'qs'
import { MessageBox } from 'element-ui'
import router from './router'

// import * as types from './store/types'

// axios 配置
axios.defaults.timeout = 5000;

var apiUrl = 'http://120.77.180.233:8081';

axios.defaults.baseURL = apiUrl;


// axios.defaults.baseURL = apiUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// http request 拦截器

axios.interceptors.request.use(
    config => {
      let apiName = config.url.slice(config.url.lastIndexOf('/'));

      if(localStorage.token) {
        //需要附加上token
        config.headers.token = localStorage.token;
      }else if(apiName !== '/login') {
        //如果此时非登录接口，都需要token，如果没有token，则跳转登录界面
        MessageBox({
          message: '您的登录已过期，请重新登录！',
          type: 'warning'
        });
        router.push('/login');
      }

      // 如果方法为post，使用qs.stringify实现跨域访问
      if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
      }

      return config;
    },
    err => {
      return Promise.reject(err);
    });

// http response 拦截器
/**
 * @DateTime  2017-05-08T09:19:43+0800
 * 拦截器也可以判定返回的response成功时的状态码进行拦截
 */
axios.interceptors.response.use(
    res => {
      // res.data.Code =34;
     if (res.data.code == 201) { //连接超时
          MessageBox.alert(res.data.description, '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          }).then(()=>{
            router.push('/login');
          })
      }else{ //请求成功
        return res;
      }
    },
    error => {
      if(error.toString().indexOf('Network Error') !== -1) {
         Message({
            message: '网络请求错误，请刷新或重新登录！',
            type: 'error'
          }); 
      }
  });

export default axios;