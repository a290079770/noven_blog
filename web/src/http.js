/**
 * 统一配置axios
 * 使用qs.stringify解决axios跨域问题
 * 配置axios请求类型为post时，使用qs.stringify来实现跨域访问，以及每次请求携带token
 * 配置请求成功后res，实现诸如登录失败，登录超时，账户密码错误和请求错误等拦截器
 */
import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 50000;

var defaultUrl = 'http://127.0.0.1:3000';

axios.defaults.baseURL = defaultUrl;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.defaults.withCredentials = true //axios跨域携带cookie的配置

axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(Object.assign({},config.data));
      // config.data = JSON.stringify(config.data);
    } else if (config.method === 'get') {
      // config.params = Object.assign(config.params,{appId:'com.huaxiawanjia.wjf'});
      config.params = config.params || {};
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
    return res;
  },
  error => {
    
  });

export default axios;
