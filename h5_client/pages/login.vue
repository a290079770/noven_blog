<template>
  <div class="flex-center flex-column login-content">
    <div class="login-logo-cont">
      <img class="full-img" src="/n1.png">
    </div>

    <div class="flex flex-justify-between login-content-wrap ">
      <div class="flex flex-justify-center login-account-form-wrap ">
        <div class="login-account-form"> 
          <div class="login-form-item-cont"> 
            <div class="login-input-cont">
              <input 
              type='text' 
              class="login-nickname-input"
              placeholder="" 
              @focus="inputFocus(1,1)"
              @blur="inputFocus(1,-1)"
              v-model="account"
              />

              <span 
              class="font-xs login-input-cont-text" 
              :class="isAccountInputFocus || account ? 'login-input-cont-text-ac' : 'login-input-cont-text-inac'"
              > 账号/手机号/邮箱 </span>    
            </div>

            <div class="login-input-cont">
              <input 
              type='password' 
              class="login-nickname-input"
              placeholder="" 
              maxlength="20" 
              @focus="inputFocus(2,1)"
              @blur="inputFocus(2,-1)"
              v-model="password"
              />

              <span 
              class="font-xs login-input-cont-text" 
              :class="isPwdInputFocus || password ? 'login-input-cont-text-ac' : 'login-input-cont-text-inac'"
              > 密码 </span>    
            </div>
          </div>

          <Button type="primary" customClass="login-btn-normal login-btn-confirm" @click="login">
            账号登录
          </Button> 
          <div class="font-xs cancle-login gray6" @click="cancleLogin"> 暂不登录 </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '~/components/Button';
import { getUserDetail } from '~/assets/service/userService'
export default {
  head() {
    return {
      title:'登录Noven Blog',
      script: [ 
        { 
          src: 'https://cdn.bootcss.com/js-sha1/0.6.0/sha1.min.js',
          defer:"defer"
        },
      ],
    }
  },
  data() {
    return {
      account:'',
      password:'',
      isAccountInputFocus:false,
      isPwdInputFocus:false,
      isShowLoginForm:false,
    }
  },

  components:{
    Button
  },
  methods:{
    // 登录
    async login(formName) {
      let valid = this.validFormData();
      if(!valid) return;
      
      //判定sha1插件是否引入
      let count = 5;
      while(count -- ) {
        if(!window.sha1) await new Promise((resolve)=>setTimeout(resolve,1000));
        else break;
      }

      if(!window.sha1) {
        this.$message('程序好像跑偏了，请刷新试试呢～!');
        return;
      }

      //密码加密
      if(this.password && (this.password !== localStorage.getItem('pwd'))) {
        this.password = sha1(this.password).toUpperCase();
      }

      //发起登录
      this.$http.post('/user/login',{
        Account:this.account,
        Password:this.password
      }).then(({ token }) => {
        this.setCookie('token',token, 1000 * 3600 * 2);
        localStorage.setItem('account',this.account);
        return getUserDetail();
      }).then(res => {
        localStorage.setItem('userInfo',JSON.stringify(res));
        this.$router.go(-1);
      })
    },

    validFormData() {
      let { account , password } = this;
      //验证账号
      if( !account || !account.replace(/ /g,'') ) {
        this.$message('请输入账号！');
        return false;
      }

      //验证密码
      if( !password || !password.replace(/ /g,'') ) {
        this.$message('请输入密码！');
        return false;
      }

      return true;
    },

    //type - 1  - 账号 2 - 密码
    //action - 1 - 获取焦点  -1 - 失去焦点
    inputFocus(type,action) {
      if(action == 1) {
        //获取焦点
        if(type == 1) {
          this.isAccountInputFocus = true
        }else if(type == 2) {
          this.isPwdInputFocus = true
        }
      }else {
        //失去焦点
        if(type == 1) {
          this.isAccountInputFocus = false
        }else if(type == 2) {
          this.isPwdInputFocus = false
        }
      }
    },


    

    cancleLogin() {
      this.$router.go(-1);
    }

  },
  created() {
    
  },
  mounted() {
    //每次到了这个页面，直接认为用户退出了登录，清除用户信息
    this.delCookie('token');
    localStorage.removeItem('userInfo');
    this.account = localStorage.getItem('account');

    this.setPageTitle('登录Noven');
  },
}
</script>
