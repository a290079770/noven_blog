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

        <figure class="detail-cover">
          <img :src="articleInfo.Url" class="detail-cover-img">
        </figure>

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

      userInfo: {}
    }
  },

  methods:{
    //发布文章
    async createOrUpdate() {
      this.articleInfo.Author = this.userInfo.NickName;

      let res = await createOrUpdate(this.articleInfo);

      this.$message.success('新增文章成功！～');
      this.goTo('/detail',{
        id: res
      })
    },


    //返回去编辑
    backEdit() {
      sessionStorage.setItem('previewArticleData', JSON.stringify(this.articleInfo));
      goTo('/addArticle');
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
  mounted() {
     
  }
}
</script>
