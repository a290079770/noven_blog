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

          <Button type="primary" customClass="login-btn-normal login-btn-confirm" @click="loginAccount">
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
export default {
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


    loginAccount() {},

    cancleLogin() {
      this.$router.go(-1);
    }

  },
  created() {
    
  },
  mounted() {
    
  },
}
</script>
