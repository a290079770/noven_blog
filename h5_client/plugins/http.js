/**
 * 统一配置axios
 * 使用qs.stringify解决axios跨域问题
 * 配置axios请求类型为post时，使用qs.stringify来实现跨域访问，以及每次请求携带token
 * 配置请求成功后res，实现诸如登录失败，登录超时，账户密码错误和请求错误等拦截器
 */
//整个大项目的api地址
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { 
  MessageBox,
 } from 'mint-ui';

// axios 配置
axios.defaults.timeout = 5000;

let apiUrl = 'https://api.novenblog.xin';
// let apiUrl = 'http://test.api.novenblog.xin';
// let apiUrl = 'http://novenblog_api.com';

// Vue.prototype.thirdLoginReturnUrl = 'https://www.novenblog.xin/thirdLogin';
Vue.prototype.thirdLoginReturnUrl = 'http://test.novenblog.xin/thirdLogin';

axios.defaults.baseURL = apiUrl;

// axios.defaults.baseURL = apiUrl;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// http request 拦截器

axios.interceptors.request.use(
    config => {
      config.data = config.data || {};
      config.headers.appCode = 1;

      let apiName = config.url.slice(config.url.lastIndexOf('/'));

      let token = Vue.prototype.getCookie('token');
      if(token) {
        //需要附加上token
        config.headers.token = token;
      }else {
        localStorage.removeItem('userInfo');
      }
      
      // 如果方法为get，使用qs.stringify实现跨域访问
      if(config.method  === 'get'){
        
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
      let { data: { code, data , description}} = res;   
      if (code == 21) {
        //连接超时
        if(description.indexOf("token") !== -1){
          MessageBox.close();
          Vue.prototype.$alert(description, '提示', {
            confirmButtonText: '重新登录',
            type: 'warning',
          }).then(()=>{
            Vue.prototype.goTo('/login','',true);
          })
        }else {
          //其他错误轻提示 
          Vue.prototype.$message(description);   
          return Promise.reject(description);
        }
      }else{  
        //请求成功
        return data;
      }
    },
    error => {
      if(error.toString().indexOf('Network Error') !== -1) {
         Vue.prototype.$message({
          message: '网络请求错误，请刷新重试！',
          type: 'error'
         }); 
      }

      return Promise.reject('异常错误');
  });


Vue.prototype.$http = axios;
Vue.prototype.apiUrl = apiUrl;