<template>
	<div class="login-page" @keyup.enter="login('loginForm')" :style="{width:winWidth+'px',height:winHeight+'px'}">
		<div class="login-wrap">
		  	<img src="../assets/images/blog_logo1.png" ref="logo">
		  	<el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="50px" class="demo-ruleForm">
				<el-row v-show="showObj.account" class="mb10 username">
					<div ref="account">
						<el-col :span="21">
							<el-input v-model.number="loginForm.account" placeholder="请输入帐号" ></el-input>
						</el-col>
						<el-col :span="3">
							<span class="icon-right"><img src="../assets/images/用户.png"></span>
						</el-col>
					</div>
				</el-row>
				<el-row  v-show="showObj.password" class="mb10 password">
					<div ref="password">
						<el-col :span="21">
							<el-input type="password" v-model="loginForm.pass"  placeholder="请输入密码"auto-complete="off"></el-input>
						</el-col>
						<el-col :span="3">
							<span class="icon-right"><img src="../assets/images/密码.png"></span>
						</el-col>
					</div>
				</el-row>
				<!-- <el-row class="mb10 verification">
					<el-input v-model="loginForm.verification"></el-input>
				</el-row> -->
				<el-row v-show="false" class="mb10 remenber-passwd">
					<el-checkbox v-model="checked">记住密码</el-checkbox>
				</el-row>
			    <el-row v-show="showObj.login">
			    	<span ref="login" >
			    	   <el-button class="mb10 loginBtn" type="primary" @click="login('loginForm')">登录</el-button>
			    	</span>
			    </el-row>
			    <!-- <el-row class="forget-passwd">
					<span>忘记密码</span>
				</el-row> -->
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
	  data() {
	    var checkAccount = (rule, value, callback) => {
	      if (!value) {
	        return callback(new Error('帐号不能为空'));
	      }
	      callback();
	    };
	    var validatePass = (rule, value, callback) => {
	      if (value === '') {
	        callback(new Error('请输入密码'));
	      }
	      callback();
	    };

	    return {
	    	checked:true,
	    	loginForm: {
		        pass: '',
		        account: '',
		        verification: ''
		     },
	      	rules2: {
		        pass: [
		          { validator: validatePass, trigger: 'blur' }
		        ],
		        account: [
		          { validator: checkAccount, trigger: 'blur' }
		        ]
		    },

		    winWidth:window.innerWidth,
		    winHeight:window.innerHeight,

		    showObj: {
		    	logo:false,
		    	account: false,
		    	password: false,
		    	login: false
		    }
	    };
	  },
	  methods: {
	  	// 登录
	    login(formName) {
	      this.$refs[formName].validate((valid) => {
	        if (valid) {
	        	//密码加密
	          if(this.loginForm.pass && (this.loginForm.pass !== localStorage.getItem('pwd'))) {
	          	this.loginForm.pass = hex_sha1(this.loginForm.pass);
	          }
	          this.$http.post('/user/loginAdmin',{
                Account:this.loginForm.account,
                Password:this.loginForm.pass
              }).then((res) => {
                if(res.data.code === 200) {
                  // this.$message({
                  //   message: res.data.description,
                  //   type: 'success',
                  //   center: true
                  // });
                  //存储token
                  localStorage.setItem('token',res.data.data.token);
                  //存储当前登录用户id
                  // sessionStorage.setItem('userId',res.data.data.Id);
                  // sessionStorage.setItem('account',res.data.data.Account);

                  if(this.checked) {
                  	//记住帐号和密码
                  	localStorage.setItem('account',this.loginForm.account);
                  	localStorage.setItem('pwd',this.loginForm.pass);

                  } else {

                  	// localStorage.removeItem('account');
                  	localStorage.removeItem('pwd');
                  }

                  // this.$route.addRoutes()
                  this.$router.push('/wrap');
                  //this.$router.push({
		          //   path:'/wrap',
		          //   query:{
		          //     id:res.data.data.Id,
		          //   }
		          // });

                } else {
                  this.$message({
                    message: res.data.description,
                    type: 'error',
                    center: true
                  });
                }

              })
	        } else {
	          return false;
	        }
	      });
	    },

	    // 动画
	    loginAnimated(time) {
          let refs = ['logo','account','password','login'];
          let aniateClass = ['rollIn','bounceInRight','bounceInRight','bounceInUp'];

	      for(let i = 0 ; i < refs.length ; i ++) {
	  		setTimeout(()=>{
	  			// this.$refs[refs[i]].className += " animated "+ aniateClass[i];
	  			this.$refs[refs[i]].classList.add('animated');
				this.$refs[refs[i]].classList.add(aniateClass[i]);
	  			this.showObj[refs[i]] = true;

	  			if(i == refs.length - 1) {
                  	setTimeout(()=> {
			  			document.body.style.overflow = 'visible';
			  		},1000)
	  			}
		   	}, i * time)
	  	  }

	      document.body.style.overflow = 'hidden';
	    }
	  },
	  mounted() {
	  	this.loginForm.account = localStorage.getItem('account');
	  	this.loginForm.pass = localStorage.getItem('pwd');
	  	window.onresize = () => {
	  		this.winWidth = window.innerWidth;
	  		this.winHeight = window.innerHeight;
	  	}

	  	this.loginAnimated(300);
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.mb10 {
		margin-bottom: 10px;
	}
	.login-page {
		background: url('/static/login_bg.jpg');
		background-size: cover;
		.el-input__inner {
			border: none;
			border-radius: 0;
			height: 30px;
			line-height: 30px;
			font-size: 12px;
		}
	}
	.login-wrap {
		position: absolute;
		right: 70px;
		top: 50%;
		margin-top: -150px;
		padding: 25px;
		width: 300px;
		height: 300px;

	}
	.loginBtn {
		width: 100%;
		height: 30px;
		line-height: 30px;
		border-radius: 0;
		padding: 0;
		font-size: 12px;
		box-sizing: border-box;
		border: none;
	}
	.login-wrap > img {
		display: block;
		position: absolute;
		left: 50%;
		margin-left: -80px;
		width: 160px;
	}
	.demo-ruleForm {
		margin-top: 70px;
	}
	.icon-right {
		display: inline-block;
		width: 100%;
		height: 30px;
		text-align: center;
		border: 1px solid #ddd;
		box-sizing: border-box;
		& > img {
			margin-top: 7px;
			width: 16px;
			height: 16px;
		}
	}
	.forget-passwd {
		color: #fff;
		cursor: pointer;
		text-align: center;
		font-size: 12px;
	}
</style>
