<template>
  <div class="wj-footer" v-show="showFooter">
    <div class="nx-footer-place"></div>
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item :key="item.id" :id="item.id" v-for="(item,index) in tabList">
        <img slot="icon" :src="selected == item.id ? item.activeIcon : item.defaultIcon">
        {{item.title}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  props:['footerList'],
  data() {
    return {
      selected: -1,
      tabList:[
        { 
          id:0,
          title:'首页',
          defaultIcon:'/index2.png',
          activeIcon:'/index1.png',
          path:'/',  //对应路由路径
          query:{}   //路由携带的参数
        },
        {
          id:1,
          title:'文章',
          defaultIcon:'/article2.png',
          activeIcon:'/article1.png',
          path:'/list',
          query:{}
        },
        {
          id:2,
          title:'留言',
          defaultIcon:'/my2.png',
          activeIcon:'/my1.png',
          path:'/feedback',
          query:{}
        },
        {
          id:3,
          title:'我的',
          defaultIcon:'/n2.png',
          activeIcon:'/n1.png',
          path:'/my',
          query:{}
        },
      ]
    }
  },
  methods:{
    setActiveTab() {
      let activePath = this.$route.path;

      this.selected = this.tabList.findIndex(item => item.path.indexOf(activePath) !== -1 );
    },
  },
  created() {
    this.tabList =  this.footerList ||  this.tabList;
  },
  mounted() {
    this.setActiveTab();
  },
  computed: {
    showFooter() {
      let ShowFooterPathList = [...this.tabList.map(item => item.path),'/index'];
      let activePath = this.$route.path;

      //显示并处理当前选中
      return ShowFooterPathList.find(item => item.indexOf(activePath.replace(/\//g,'')) !== -1);
    }
  },
  watch:{
    'selected':function(val) {
      //非tab页
      if(!val || val == -1) return;

      this.$router.push({
        path:this.tabList[val].path,
        query:this.tabList[val].query
      })
    },
    
    $route() {
      this.setActiveTab();
    }
  }
}

</script>
<style lang='less' scoped>
   .wj-footer .is-selected {
      background: transparent !important;
   }

   .nx-footer-place {
      height: 1.12rem;
   }
</style>
