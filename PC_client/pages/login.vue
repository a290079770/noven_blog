<template>
	<div class="login-page" @keyup.enter="login('loginForm')" :style="{width:winWidth+'px',height:winHeight+'px'}">
		<div class="login-wrap">
		  	<img src="~static/blog_logo2.png" ref="logo">
		  	<el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="50px" class="demo-ruleForm">
				<el-row v-show="showObj.account" class="mb10 username">
					<div ref="account">
						<el-col :span="21">
							<el-input v-model.number="loginForm.account" placeholder="请输入帐号" ></el-input>
						</el-col>
						<el-col :span="3">
							<span class="icon-right"><img src="~assets/icon/用户.png"></span>
						</el-col>
					</div>
				</el-row>
				<el-row  v-show="showObj.password" class="mb10 password">
					<div ref="password">
						<el-col :span="21">
							<el-input type="password" v-model="loginForm.pass"  placeholder="请输入密码"auto-complete="off"></el-input>
						</el-col>
						<el-col :span="3">
							<span class="icon-right"><img src="~assets/icon/密码.png"></span>
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

        <el-row v-show="showObj.login" class="mb10 mt10">
          <img @click="qqLogin" style="width: 16px;cursor: pointer;" src="~assets/icon/qq.png">
        </el-row>

			    <!-- <el-row class="forget-passwd">
					<span>忘记密码</span>
				</el-row> -->
			</el-form>
		</div>
	</div>
</template>

<script>
import { getUserDetail } from '~/assets/service/userService'
export default {
	layout:'normal',
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

	    winWidth:0,
	    winHeight:0,

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
          let pass = sha1(this.loginForm.pass).toUpperCase();

          //发起登录
          this.$http.post('/user/login',{
            Account:this.loginForm.account,
            Password:pass
          }).then(({ token }) => {
            this.setCookie('token',token, 1000 * 3600 * 2);
            localStorage.setItem('account',this.loginForm.account);
            return getUserDetail();
          }).then(res => {
          	localStorage.setItem('userInfo',JSON.stringify(res));
            this.$router.go(-1);
          })
        } else {
          console.log('error submit!!');
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
    },

    setWindow() {
      this.winWidth = window.innerWidth
      this.winHeight = window.innerHeight
    },
    qqLogin(){
      var qqAppId = '101547883'; // 上面申请得到的appid
      var qqAuthPath = 'https://www.novenblog.xin/thirdLogin'; // 前面设置的回调地址
      var state = 'novenblog'; // 防止CSRF攻击的随机参数，必传，登录成功之后会回传，最好后台自己生成然后校验合法性
      location.href = `https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=${qqAppId}&redirect_uri=${encodeURIComponent(qqAuthPath)}&state=${state}`;
    }
  },
  created() {
    
  },
  mounted() {
    this.setWindow();
    
    //每次到了这个页面，直接认为用户退出了登录，清除用户信息
    this.delCookie('token');
    localStorage.removeItem('userInfo');
  	this.loginForm.account = localStorage.getItem('account');
    console.log(this.loginForm.account)
  	window.onresize = () => {
  		this.setWindow();
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
		background: url('~static/login_bg1.jpg');
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
		font-size: 14px;
		box-sizing: border-box;
		border: none;
		background: #d13954;
		&:hover {
			background: rgba(220,20,60,1);
		}
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

	
	.animated {
	  -webkit-animation-duration: 1s;
	  animation-duration: 1s;
	  -webkit-animation-fill-mode: both;
	  animation-fill-mode: both;
	}

	@-webkit-keyframes rollIn {
	  from {
	    opacity: 0;
	    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
	    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
	  }

	  to {
	    opacity: 1;
	    -webkit-transform: translate3d(0, 0, 0);
	    transform: translate3d(0, 0, 0);
	  }
	}

	@keyframes rollIn {
	  from {
	    opacity: 0;
	    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
	    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
	  }

	  to {
	    opacity: 1;
	    -webkit-transform: translate3d(0, 0, 0);
	    transform: translate3d(0, 0, 0);
	  }
	}

	.rollIn {
	  -webkit-animation-name: rollIn;
	  animation-name: rollIn;
	}


@-webkit-keyframes bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(-25px, 0, 0);
    transform: translate3d(-25px, 0, 0);
  }

  75% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }

  90% {
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(-25px, 0, 0);
    transform: translate3d(-25px, 0, 0);
  }

  75% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }

  90% {
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.bounceInRight {
  -webkit-animation-name: bounceInRight;
  animation-name: bounceInRight;
}

@-webkit-keyframes bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 3000px, 0);
    transform: translate3d(0, 3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 3000px, 0);
    transform: translate3d(0, 3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, -20px, 0);
    transform: translate3d(0, -20px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.bounceInUp {
  -webkit-animation-name: bounceInUp;
  animation-name: bounceInUp;
}
</style>
