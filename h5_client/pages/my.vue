<template>
   <div class="my">
     <div class="mine-info-wrap">
      <div class="mine-info-img-wrap">
        <div class='mine-info-img-box'>
          <div class="mine-info-img bg-full-img" :style="{background: `url(${ userInfo.CoverUrl })`}"></div>
        </div>
      </div>
      <div class="flex flex-justify-between nick-name-wrap">
        <div class="flex-center info nick-name">{{userInfo.NickName}}</div>
        <div class="info flex-column current-time-wrap">
          <div class="flex-center">
            <img class="address-icon" src="~assets/icon/local.svg">
            <span class="ml10">{{userInfo.Province || '成都市'}}</span>
          </div>
          <span>{{date}}</span>
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

     <section>
      <vue-core-image-upload
        :crop="false"
        :credentials="false"
        inputOfFile="file"
        :compress="50"
        :max-file-size="500 * 1024 * 1024"
        :url="getUploadParams().action" 
        @imageuploaded="imageuploaded"
        @errorhandle="errorhandle"
        >
        <div class="flex flex-align-center my-oparate-item my-oparate-item-1">
          <img src="~assets/icon/cover.svg" class="my-oparate-item-icon">
          <span> 修改头像 </span>
        </div>
      </vue-core-image-upload>
    </section>
    

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
      <span @click="signOut"> 退出登录 </span>   
     </div>


   </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
import { getArticleList , getCollectList } from '~/assets/service/articleService'
import { signOut } from '~/assets/service/userService'
import { updateUserInfo } from '~/assets/service/userService'
export default {
  async asyncData ({ app , redirect}) {
    //拦截非管理员用户
    let isAuth = await app.validUserInfo();
    if(!isAuth) redirect('/');
  },
  head() {
    return {
      title: this.userInfo.NickName + '的个人空间'
    }
  },
  data() {
    return {
      publishCount: 0,
      collectCount: 0,
      userInfo:{},
      date: this.dateFormat(Date.now(),'yyyy-mm-dd')
    }
  },
  components:{
    'vue-core-image-upload': VueCoreImageUpload,
  },

  methods:{
    //获取我的发布和我的收藏
    async getArticleCount() {
     let [{recordCount : publishCount},{ recordCount: collectCount}] = await Promise.all([
        getArticleList(1,1,'','CreateTime',true),
        getCollectList()
     ]).catch(()=> [{recordCount:0},{recordCount:0}])

     this.publishCount = publishCount;
     this.collectCount = collectCount;
    },  

    //修改用户信息
    async updateUserInfo(url) {
      this.userInfo = await updateUserInfo(Object.assign({},this.userInfo,{ CoverUrl: url}));

      this.$set(this.userInfo,'CoverUrl',url);
      this.$message('修改成功！');
      localStorage.setItem('userInfo',JSON.stringify(this.userInfo));
    },
    //退出登录
    async signOut() {
      let confirm = await this.$confirm('是否要退出？','提示').catch(()=>null)
      if(!confirm) return; 

      //发起退出登录
      await signOut();

      this.userInfo = {};
      this.delCookie('token');
      sessionStorage.clear();
      localStorage.clear();
      this.goTo('/','',true);
    },

    imageuploaded(res) {
      let { code , data, description } = res;

      if(code !== 200) {
        this.$message(description);
        return;
      }

      this.updateUserInfo(data.url);
    },
    errorhandle() {
      this.$message('图片上传出错！');
    },
  },
  computed:{

  },
  created() {
    //获取用户信息,如果有就显示
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
    }catch(e) {
      //没有用户信息的话用默认的
    }

    this.getArticleCount();
  },
  mounted() {
    this.setPageTitle(this.userInfo.NickName + '的个人空间');
  },
}
</script>
