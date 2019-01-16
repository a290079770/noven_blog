<template>
  <div class="wrap">
    <!-- 顶部logo栏 -->
    <el-row class="header">
      <el-col :span="14">
        <p class="header-left" @click="$router.push('/wrap/index')">
          <img  src="../assets/images/blog_logo2.png">
          <span>后台管理系统</span>
        </p>
      </el-col>
      <el-col :span="10">
        <p class="header-right">
          <span class="welcome">欢迎您：<span>{{ username }}</span></span>
          <span class="exit" @click="exit"><i class="iconfont icon-tuichu1"></i>退出</span>
        </p>
      </el-col>
    </el-row>

    <el-row class="content">
      <!-- 左侧导航栏开始 -->
      <div class="left-aside">
        <div class="touxiang" :style="{'background': 'url(' + touxiang  + ') center center / cover no-repeat'}">
        </div>

        <p class="admin-name">{{ username }}</p>

        <el-menu
          router
          default-active="/wrap/index"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#2b333e"
          text-color="#999"
          active-text-color="#ff5d6a"
          >

          <el-menu-item index="/wrap/index" >
            <i class="iconfont  icon-daohangshouye mr8"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/wrap/article">
            <i class="iconfont icon-article mr8"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="/wrap/comment">
            <i class="iconfont icon-banner mr8"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/wrap/user">
            <i class="iconfont icon-yonghushezhi mr8"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/wrap/photoAlbum" disabled>
            <i class="el-icon-picture"></i>
            <span slot="title">相册管理</span>
          </el-menu-item>
          <el-menu-item index="/wrap/mood" disabled>
            <i class="iconfont icon-xinqing mr8"></i>
            <span slot="title">心情管理</span>
          </el-menu-item>

          <el-menu-item index="" @click="exit">
            <i class="iconfont icon-tuichu1 mr8"></i>
            <span slot="title">退出</span>
          </el-menu-item>

        </el-menu>
      </div>

      <!-- 右侧内容区 -->
      <div class="right-aside">
        <div class="content-main">
          <router-view/>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      touxiang: '',
      username: ''
    }
  },
  methods: {
    // 获取用户详情
    getUserDetail() {
      this.$http.get('/user/detail').then((res) => {
        if(res.data.code === 200) {
          sessionStorage.setItem('userDetail', JSON.stringify(res.data.data));

          this.username = res.data.data.NickName;
          this.touxiang = res.data.data.CoverUrl || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541610478229&di=46134ec1a7b7c9a8823de9d8ad15629d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0152b457d1129b0000012e7e2d081f.jpg%401280w_1l_2o_100sh.jpg';
        } else {
          this.$message({
            message: res.data.description,
            type: 'error',
            center: true
          });
        }

      })
    },
    exit() {
      this.$confirm('是否退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          this.$router.push('/login');
            // this.$message({
            //   type: 'success',
            //   message: '退出到登录页面!'
            // });
        }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出！',
              center: true
            });
        });
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    }
  },
  created() {
    this.getUserDetail();
  },
  mounted() {
    // this.username = localStorage.getItem('account');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @bgcolor: #ff5d6a;
  @toBgColor: #d13954;
  .wrap {
    height: 100%;
    min-width: 1200px;
  }

  .mr8 {
    margin-right: 10px;
  }
  .header {
    padding: 5px 25px;
    background: linear-gradient(@bgcolor, @toBgColor);
    &-left {
      cursor: pointer;
      & > img {
        float: left;
        height: 50px;
      }
      span {
        margin-left: 20px;
        margin-top: 26px;
        display: inline-block;
        font-size: 18px;
        line-height: 1em;
        color: #eee;
      }
    }
    &-right {
      color: #eee;
      text-align: right;
      font-size: 14px;
      line-height: 50px;
      .exit {
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
  .content {
    background: url("../assets/images/body_bg.png") repeat;
    height: 100%;
    .left-aside {
      float: left;
      width: 20%;
      height: 100%;
      background: #2b333e;
      overflow: auto;
      .touxiang {
        margin: 20px auto;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        text-align: center;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: url(../assets/images/26.jpg);
        background-size: cover;
        background-position: center;

        span {
          display: block;
          margin-top: 10px;
          text-align: center;
          color: #ddd;
        }
      }


      .admin-name {
        margin: -5px 0 10px 0;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color:#eee;
      }

      .el-menu-item:hover {
        color: @bgcolor !important;
      }
    }
    .right-aside {
      float: right;
      width: 80%;
      height: 100%;
      overflow: auto;
      .content-main {
        padding: 20px;

        &-wrap {
          // background: #fff;
          // padding: 15px;
          // padding-bottom: 60px;
          // border-radius: 8px;
          // box-shadow: 5px 5px 5px #ddd,-5px 5px 5px #ddd;
          .title {
            .blue {
              color: #d13954;
              font-size: 28px;
            }
            .gray {
              color: #838FA1;
              font-size: 16px;
            }
            & > hr {
              height:1px;
              border:none;
              border-top:1px solid #ddd;
            }
          }
          .search {
            padding: 10px 0 15px 0;
          }
        }
      }
    }
  }
  .boxshadow {
    background: white;
    padding: 15px;
    padding-bottom: 60px;
    border-radius: 8px;
    box-shadow: 5px 5px 5px #ddd,-5px 5px 5px #ddd;
  }
</style>
