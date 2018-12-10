<template>
  <section class="pr">
    <section class="flex-center mc pr nav-menu"></section>

    <section ref="navMenu" class="flex-center mc pr nav-menu nav-menu-abs" :class="{'nav-menu-fiexd':isFixed}">
      <section class="flex flex-align-center flex-justify-between nav-menu-cont">
        <ul class="flex flex-align-center pr nav-menu-items">
          <li 
          v-for="(item,index) in navList" 
          :key="index"  
          class="flex-center font-l nav-menu-item" 
          :class="{'nav-menu-item-active': selectedIndex === index }"
          @click="changeSelectedIndex(index)"
          >
            {{item.title}}
          </li>
          <li class="nav-menu-item nav-menu-item-line" :style="{transform: 'translateX(-'+ (navList.length - selectedIndex) * 150 +'px)', left: navList.length * 150 + 'px'}"></li>
        </ul>
        <section class="flex flex-align-center flex-justify-end nav-menu-right">
          <img @click="search" class="search-input-icon" src="~assets/icon/search.svg">
          <input 
          class="search-input" 
          :class="{ 'search-input-focus' : isSearchInputFocus}" 
          type="text" 
          placeholder="请输入关键字搜索文章"
          v-model="keywords" 
          @focus="isSearchInputFocus = true"
          @blur="isSearchInputFocus = false"
          @keyup.enter="search"
          >

          <div class="flex-center nav-menu-login-cont" >
            <span @click="goTo('/login')" v-if="!userInfo" class="primary">登录</span>
            
            <el-popover
              v-else 
              placement="bottom"
              trigger="hover">
              <div @click="signOut" class="flex-center nav-menu-sign-out">
                退出
              </div>
              <figure slot="reference" @click="goTo('/my')"  class="nav-menu-login-cover bg-full-img" :style="{background: `url(${userInfo.CoverUrl || '/n1.png'})` }"></figure>
            </el-popover>
          </div>
        </section>
      </section>
    </section>

  </section>
</template>

<script>
import { signOut } from '~/assets/service/userService'
export default {
  data() {
    return {
      //导航数据
      navList:[
        {
          title:'首页',
          link:'/',
          contRoutes:['a']
        },
        {
          title:'学海无涯',
          link:'/list',
          contRoutes:[]
        },
        {
          title:'书不尽言',
          link:'/feedback',
          contRoutes:[]
        },
        {
          title:'关于我们',
          link:'/aboutus',
          contRoutes:['a']
        },
        // {
        //   title:'我的创作',
        //   link:'/my',
        //   contRoutes:[]
        // },
      ],
      selectedIndex: 0,

      keywords:'',
      isSearchInputFocus: false,
      isFixed: false,
      navBarTop: 0,

      userInfo: null
    }
  },

  methods:{
    /**
     * [search 执行搜索文章]
     * @Author   罗文
     * @DateTime 2018-11-23
     * @return   {[type]}   [description]
     */
    search() {
      let { keywords } = this;
      if(keywords)
        this.$router.push({
          path:'/list',
          query:{
            keywords
          }
        })
      else
        this.$router.push('/list')
    },
    /**
     * [changeSelectedIndex 修改当然活跃项]
     * @Author   罗文
     * @DateTime 2018-11-23
     * @param    {[Number]}   index [活跃项索引]
     * @return   {[type]}         [description]
     */
    changeSelectedIndex(index) {
      this.selectedIndex = index;
      this.changeRoute(index);
    },

    /**
     * [changeRoute 跳转到对应路径]
     * @Author   罗文
     * @DateTime 2018-11-23
     * @param    {[Number]}   index [活跃项索引]
     * @return   {[type]}         [description]
     */
    changeRoute(index) {
      this.$router.push({
        path: this.navList[index].link  
      })
    },

    //设置navbar是否是固定定位
    setNavBarFixed() {
      if(this.$refs.navMenu.getBoundingClientRect) {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        //根据当前元素位置，执行固定定位
        this.isFixed = scrollTop > this.navBarTop;
      }
    },

    //设置面板活跃项
    setActive() {
      //一刷新或者一进入，根据当然路由，设置活跃项
      let { path } = this.$route;

      let find = this.navList.find( item => {
        return item.link  === path || item.contRoutes.find( citem => citem === path);
      })

      if( find ) this.selectedIndex = this.navList.findIndex( item => item.link === find.link)
    },

    //每次路由切换，重新渲染用户信息
    setUserInfo() {
      if(!this.getCookie('token')) {
        this.userInfo = null;
        return;
      }

      
      //获取用户信息,如果有就显示
      try {
        this.userInfo = JSON.parse(localStorage.userInfo);
      }catch(e) {
        //没有用户信息的话用默认的
        this.userInfo = null;
      }
    },

    //退出登录
    async signOut() {
      let confirm = await this.$confirm('是否要退出？','提示');
      if(!confirm) return; 

      //发起退出登录
      await signOut();

      this.delCookie('token');
      sessionStorage.clear();
      localStorage.clear();
      this.goTo('/');
    }
  },
  created() {
    this.setActive();
    this.setUserInfo()
  },
  mounted() {
    if(this.$refs.navMenu &&  this.$refs.navMenu.getBoundingClientRect) {
        let { top } = this.$refs.navMenu.getBoundingClientRect();
        this.navBarTop = top;
    }  
    this.setNavBarFixed();

    window.onscroll = () => {
      this.setNavBarFixed();
    }
  },

  watch: {
    $route(nv) {
      this.setActive();
      this.setUserInfo();

      if(this.$refs.navMenu.getBoundingClientRect) {
        let { path } = nv;
        //首页要请求图片
        this.navBarTop = path !== '/' ? 175 : window.innerHeight + 175;
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~assets/style/varite.less';
  .nav-menu {
    height: 66px;
    background: white;
    border-bottom: @borderBold;

    .nav-menu-cont {
      width:@pageWidth;
      height: 100%;
    }

    .nav-menu-items {
      height:100%;
      .nav-menu-item {
        position: relative;
        z-index: 2;
        transition: @transition;
        width: 150px;
        height:100%;
        cursor: pointer;
        &:hover {
          color: @primary;
        }
      }

      .nav-menu-item-active {
        color: @primary;
      }

      .nav-menu-item-line {
        position: absolute;
        top: 0;
        z-index:1;
        border-bottom: 4px solid @primary;
      }
    }

    .nav-menu-right {
      width: 360px;
      height: 100%;
      .search-input {
        transition: @transition;
        height: 30px;
        width: 170px;
        text-indent: 30px;
        background: transparent;
        border: 1px solid #e0e0e0;
        outline: none;
        border-radius: 4px;
      }

      .search-input-focus {
        width: 250px;
        border: 1px solid @primary
      }

      .search-input-icon {
        margin-right: -25px;
        width: 16px;
        height: 16px;
      }

      .nav-menu-login-cont {
        margin-left: 20px;
        width: 40px;
        height: 40px;
        cursor: pointer;

        .nav-menu-login-cover {
          transition: @transition;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          &:hover {
            border-radius: 8px;
          }
        }
      }
    }
  }

  .nav-menu-abs {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .nav-menu-fiexd {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
  }

  .nav-menu-sign-out {
    &:hover {
      cursor:pointer;
      color: @primary;
    };
  }
</style>