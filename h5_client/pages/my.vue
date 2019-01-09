<template>
   <div class="my">
     <div class="mine-info-wrap">
      <div class="mine-info-img-wrap">
        <div class='mine-info-img-box'>
          <img class="mine-info-img" src="https://api.novenblog.xin/images/y7bPGjKBCsNJBvIg_photo_1542895870.jpg" />
        </div>
      </div>
      <div class="flex flex-justify-between nick-name-wrap">
        <div class="flex-center info nick-name">NovenNov</div>
        <div class="info flex-column current-time-wrap">
          <div class="flex-center">
            <img class="address-icon" src="~assets/icon/local.svg">
            <span class="ml10">成都</span>
          </div>
          <span>2019-01-03</span>
        </div>
      </div>
    </div>


     <div class="flex flex-justify-between my-published">
        <nuxt-link :to="{ name:'myList',query:{type : 1} }">
         <div class="flex flex-justify-between my-published-item">
           <div class="flex flex-align-center flex-justify-center my-published-item-left">
            <img src="~assets/icon/write-black.svg" class="my-published-item-img">
           </div>
           <div class="flex flex-justify-center flex-align-center my-published-item-right">
            <span class="my-published-item-number">{{publishCount}} </span>   
            <span>我的发布 </span>    
           </div>
         </div>
        </nuxt-link> 
        <nuxt-link :to="{ name:'myList',query:{type : 2} }">
         <div class="flex flex-justify-between my-published-item ">
           <div class="flex flex-align-center flex-justify-center my-published-item-left">
            <img src="~assets/icon/like.svg" class="my-published-item-img">
           </div>
           <div class="flex flex-justify-center flex-align-center my-published-item-right">
            <span class="my-published-item-number">{{collectCount}} </span>   
            <span>我的收藏 </span>    
           </div>
         </div>
        </nuxt-link>
     </div>



     <div class="flex flex-align-center my-oparate-item my-oparate-item-1" @click="updateCover">
      <img src="~assets/icon/cover.svg" class="my-oparate-item-icon">
      <span> 修改头像 </span>   
     </div>
    

     <nuxt-link :to="{ name:'updateUserInfo',query:{type : 3} }">
       <div class="flex flex-align-center my-oparate-item">
        <img src="~assets/icon/nickname.svg" class="my-oparate-item-icon">
        <span> 修改昵称 </span>   
       </div>
     </nuxt-link>
      
     <nuxt-link :to="{ name:'updateUserInfo',query:{type : 4} }"> 
       <div class="flex flex-align-center my-oparate-item">
        <img src="~assets/icon/abstract.svg" class="my-oparate-item-icon">
        <span> 修改简介 </span>   
       </div>
     </nuxt-link>

     <div class="flex flex-align-center my-oparate-item">
      <img src="~assets/icon/exit.svg" class="my-oparate-item-icon">
      <span @click="logoutAction"> 退出登录 </span>   
     </div>


   </div>
</template>

<script>
import { getArticleList } from '~/assets/service/articleService'
export default {
  data() {
    return {
      publishCount: 0,
      collectCount: 0
    }
  },

  methods:{
    /**
     * [getArticleList 获取文章列表]
     * @param  {[StriNg]} listName [对应this.data里的三个列表]
     * @return {[type]}          [description]
     */
    async getArticleList(listName) {
      let orderBy = [
          {
            listName:'dataList',
            order:'CreateTime',
            ps:10
          },
          {
            listName:'bannerList',
            order:'ReadCount',
            ps:5
          },
          {
            listName:'recommendList',
            order:'CollectCount',
            ps:10
          },
      ];

      let { order , ps } = orderBy.find(item => item.listName == listName);
      let { list } = await getArticleList(ps,1,'',order);
      this[listName] = list;
    },

    updateCover() {},
    goTo() {},
    logoutAction() {}
  },
  computed:{
    isLogin() {
      try {
        return JSON.parse(localStorage.userInfo);
      }catch(e) {
        //没有用户信息的话用默认的
        return false;
      }
    }
  },
  created() {
    //获取用户信息,如果有就显示
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
    }catch(e) {
      //没有用户信息的话用默认的
    }

    this.getArticleList('dataList');
    this.getArticleList('bannerList');
    this.getArticleList('recommendList');
  },
  mounted() {
    
  },
}
</script>
