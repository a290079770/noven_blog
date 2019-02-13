<template>
  <div class="article-detail-cont" v-if="articleInfo">
     <div class="article-detail-title">
      {{articleInfo.Title}}
     </div>

      <div class="flex flex-align-center flex-justify-between article-info">
        <div class="article-info-left">{{articleInfo.Author}}  
          <span class="article-info-time"> {{articleInfo.CreatTime}}</span>
        </div>  

        <div class="flex flex-align-center flex-justify-between article-info-numbercont">
          <div class="flex flex-align-center flex-justify-end article-info-zan">
            <img src="/zan-kong.svg" class=" article-info-icon">
            <div class="article-info-number">
              0 
            </div>
          </div>

          <div class="flex flex-align-center flex-justify-end article-info-zan">
            <img src="~assets/icon/view.svg" class=" article-info-icon">
            <div class="article-info-number">
              0 
            </div>
          </div>
        </div>   
      </div>
      
      
      <!-- 简介 -->
      <div class="article-brief font-xs gray9" v-if="articleInfo.Brief">
         简介：{{articleInfo.Brief}}
      </div>

      
      <!-- 封面 -->
      <div class="article-cover bg-full-img" :style="{background: `url(${ articleInfo.Url })`}" v-if="articleInfo.Url" >
      </div>

      
      <!-- 内容 -->
      <div class="gray6 font-l article-content detail-content " v-html="articleInfo.Content" >
        
      </div>


      <div class="flex page-bottom">
        <div class=" page-bottom-btn page-bottom-btn-plain" @click="backEdit">
          修改
        </div>

        <div class=" page-bottom-btn " @click="createOrUpdate">
          发布
        </div>
      </div>
   </div>
</template>

<script>
import { createOrUpdate } from '~/assets/service/articleService'
export default {
  async asyncData ({ app , redirect}) {
    //拦截非管理员用户
    let isAuth = await app.validUserInfo();
    if(!isAuth) redirect('/');
  },
  data() {
    return {
      articleInfo:{
        Title:'',
        Url:'',
        Brief:'',
        CreateTime:'',
        Content:'',
        Author:''
      },

      userInfo: {},

    }
  },
  head() {
    return {
      title:'预览文章—' + this.articleInfo.Title
    }
  },

  methods:{
   //发布文章
    async createOrUpdate() {
      let { userInfo: { NickName }, articleInfo: { Content, Id , Url }} = this;

      //如果文章没有封面的话，选取一张系统内置图做为默认图
      if( !Url || !Url.replace(/ /g,'')) {
        let urlConfirm = await this.$confirm('您的文章没有上传封面，是否使用一张随机封面？','提示').catch(()=> false)
        if(urlConfirm) {
          let random = Math.ceil(Math.random()* 3)  + 1;
          this.articleInfo.Url = this.apiUrl + `/images/users/arc-default${random}.jpg`
        }
      }

      let confirm = await this.$confirm('确定发布文章？','提示').catch(()=> false)
      if(!confirm) return;

      //发起新增或修改
      this.articleInfo.Author = NickName;
      this.articleInfo.Content = Content.replace(/\\/g,'/');


      let res = await createOrUpdate(this.articleInfo).catch(err => {
        //捕获到异常
        return -1
      })

      if( res !== -1) {
        //新增成功
        this.$message( res ? '新增文章成功！～' : '修改文章成功！～');
        sessionStorage.removeItem('previewArticleData')

        this.goTo('/detail',{
          id: res || Id
        },true)
      }
    },

    //返回去编辑
    backEdit() {
      sessionStorage.setItem('previewArticleData', JSON.stringify(this.articleInfo));
      let { id } = this.$route.query;
      let query = id ? `id=${id}` : '';
      this.goTo('/addArticle',query,true);
    }
  },
  created() {
    
  },
  mounted() {
    //获取用户信息
    try {
      this.articleInfo = JSON.parse(sessionStorage.previewArticleData);
      this.userInfo = JSON.parse(localStorage.userInfo);
      this.setPageTitle(this.articleInfo.Title);
    }catch(e) {
      this.$confirm('获取文章预览信息或用户信息失败！','提示',{
        showCancelButton: false,
      })
      .then(() => {
        this.goTo('/my');
      })
    }
  },
  beforeDestroy() {
    // sessionStorage.removeItem('previewArticleData');
  }
}
</script>
