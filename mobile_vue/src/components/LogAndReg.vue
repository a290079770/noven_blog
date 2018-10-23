<template>
  <div class="login-and-reg">
	<div class="logo">
		<img src="../images/n1.png">
		<span class="title">Noven_blog</span>
	</div>
  	<div class="user-info">
  		<mt-field placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
	  	<mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
	  	<mt-field placeholder="请确认密码" type="password" v-model="comfirmPwd"></mt-field>
	  	<mt-button type="primary" class="submit-btn">注册</mt-button>
  	</div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: '',
      password: '',
      comfirmPwd: '',
      loginState: false
    }
  },
  methods:{
    
  },

  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @color-primary: #d13954;
  .logo {
	margin-top: 50px;
	text-align: center;
	img {
	  width: 100px;
	  height: 100px;
	}
	.title {
	  display: block;
	  font-size: 30px;
	  line-height: 40px;
	}
  }

  .user-info {
  	margin-top: 50px;
	.mint-cell {
	  border-bottom: 1px solid @color-primary;
	}
	.submit-btn {
	  width: 100%;
	  letter-spacing: 10px;
	}
  }
	
</style>
