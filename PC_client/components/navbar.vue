<template>
  <section class="flex-center mc nav-menu">
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
        <li class="nav-menu-item nav-menu-item-line" :style="{transform: 'translateX(-'+ (4 - selectedIndex) * 150 +'px)', left: navList.length * 150 + 'px'}"></li>
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
      </section>
    </section>
  </section>
</template>

<script>

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
          title:'关于我们',
          link:'/aboutus',
          contRoutes:['a']
        },
        {
          title:'书不尽言',
          link:'/suggestion',
          contRoutes:[]
        },
      ],
      selectedIndex: 0,

      keywords:'',
      isSearchInputFocus: false,
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
      console.log(this.keywords)
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
    }
  },
  created() {
    //一刷新或者一进入，根据当然路由，设置活跃项
    let { path } = this.$route;

    let find = this.navList.find( item => {
      return item.link  === path || item.contRoutes.find( citem => citem === path);
    })

    if( find ) this.selectedIndex = this.navList.findIndex( item => item.link === find.link)
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
  @import '~assets/style/common.less';
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
        transition: all .5s;
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
        transition: all .5s;
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
    }
  }
</style>