<template>
  <section class="detail">
    <section>&nbsp;</section>
    <section class="mc detail-main">
      <section class="detail-cont">
        <h1 class="flex-center detail-title">
          {{articleInfo.Title}}
        </h1>

        <p class="flex-center detail-info font gray9">
          <span class="primary">@article</span>
          <span class="font-lg info">{{userInfo.NickName}}</span>
          <span>{{dateFormat(articleInfo.CreateTime,'yyyy-mm-dd')}}</span>
        </p>

        <section v-if="articleInfo.Brief" class="detail-content font-lg detail-brief">
          “
            <span class="font-xs gray9">{{articleInfo.Brief}}</span>
          ”
        </section>

<!--         <figure class="detail-cover">
          <img :src="articleInfo.Url" class="detail-cover-img">
        </figure> -->

        <article class="font gray6 detail-content" v-html="articleInfo.Content">
          
        </article>

      </section>
    </section>
    <section class="mc detail-author preview-btns-no-bg">
      <div class="flex-center">
        <el-button @click="createOrUpdate" type="primary" class="preview-btn-submit">发布文章</el-button>
        <el-button @click="backEdit">返回编辑</el-button>
      </div>
    </section>

  </section>
</template>

<script>

import { createOrUpdate } from '~/assets/service/articleService'
export default {
  //拦截非管理员用户
  async asyncData ({ app, redirect }) {
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
      let confirm = await this.$confirm('确定发布文章？','提示').catch(()=> false)
      if(!confirm) return;

      let { userInfo: { NickName }, articleInfo: { Content, Id , Url }} = this;

      //发起新增或修改
      this.articleInfo.Author = NickName;
      this.articleInfo.Content = Content.replace(/\\/g,'/');

      //如果文章没有封面的话，选取一张系统内置图做为默认图
      if( !Url || !Url.replace(/ /g,'')) {
        let random = Math.ceil(Math.random()* 3)  + 1;
        this.articleInfo.Url = this.apiUrl + `/images/users/arc-default${random}.jpg`
      }

      let res = await createOrUpdate(this.articleInfo).catch(err => {
        //捕获到异常
        return -1
      })

      if( res !== -1) {
        //新增成功
        this.$message.success( res ? '新增文章成功！～' : '修改文章成功！～');
        sessionStorage.removeItem('previewArticleData')

        this.goTo('/detail',{
          id: res || Id
        },true)
      }
    },

    //返回去编辑
    backEdit() {
      sessionStorage.setItem('previewArticleData', JSON.stringify(this.articleInfo));
      this.goTo('/addArticle','',true);
    }
  },
  created() {
    //获取用户信息
    try {
      this.articleInfo = JSON.parse(sessionStorage.previewArticleData);
      this.userInfo = JSON.parse(localStorage.userInfo);
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
