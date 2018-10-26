<template>
  <div class="login-and-reg">
	<div class="logo">
	  <img src="../images/n1.png">
	  <span class="title">Noven_blog</span>
	</div>
  	<div class="user-info">
  	  <mt-field placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
	  <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
	  <mt-field v-if="!loginPage" placeholder="请确认密码" type="password" v-model="comfirmPwd"></mt-field>
	  <mt-button @click.native="loginOrReg" type="primary" class="submit-btn">{{!loginPage ? '注册' : '登录'}}</mt-button>
	  <p>{{loginPage ? '没有账号' : '已有账号'}}，<span @click="toLogOrReg">{{loginPage ? '去注册' : '去登录'}}</span></p>
  	</div>
    
  </div>
</template>

<script>
export default {
  name: 'LogAndReg',
  data () {
    return {
      email: '',
      password: '',
      comfirmPwd: '',
      loginPage: false
    }
  },
  methods:{
    toLogOrReg() {
      console.log(12345)
      this.loginPage = !this.loginPage;
    },
    loginOrReg() {
      if(this.loginPage) {
      	console.log('登录')
      }else {
      	console.log('注册')
      }
    }
  },

  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @color-primary: #d13954;
  .logo {
	margin-top: 0.5rem;
	text-align: center;
	img {
	  width: 1rem;
	  height: 1rem;
	}
	.title {
	  display: block;
	  /*font-size: 30px;*/
	  line-height: 0.4rem;
	}
  }

  .user-info {
  	margin-top: 0.5rem;
	.mint-cell {
	  border-bottom: 1px solid @color-primary;
	}
	.submit-btn {
	  margin-top: 0.5rem;
	  width: 100%;
	  letter-spacing: 0.1rem;
	}
	p {
	  margin-top: 0.3rem;
	  text-align: center;
	  span {
	  	color: @color-primary;
	  }
	}
  }
	
</style>
