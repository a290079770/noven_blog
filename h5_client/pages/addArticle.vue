<template>
  <section class="add-arc">
    <div class="addindex-cont">
      <!-- 标题 -->
      <div class="font addindex-border addindex-title">
        <input 
        class="addindex-title-input" 
        placeholder="请输入文章标题" 
        autofocus
        @input="inputAction(3)"
        v-model="newArticle.Title"
        />
      </div> 

      <div class="flex flex-align-center flex-justify-between gray9 font updateinfo-notice">
        <span> 您最多可以输入<span class="updateinfo-notice-hasinput">{{ titleLen }}</span>个字符 </span>    
        <span> <span class="updateinfo-notice-hasinput"> {{ titleCurrentLen }} </span>     / {{ titleLen }}</span>     
      </div>

      <!-- 简介 -->
      <div>
        <textarea
         class="updateinfo-nickname-textarea"
         placeholder="请输入文章简介！" 
         @input="inputAction(4)"
         v-model="newArticle.Brief"
         />
         
      </div>

      <div class="flex flex-align-center flex-justify-between gray9 font updateinfo-notice">
        <span> 您最多可以输入<span class="updateinfo-notice-hasinput">{{ briefLen }}</span>个字符 </span>    
        <span> <span class="updateinfo-notice-hasinput"> {{ briefCurrentLen }} </span>     / {{ briefLen }}</span>     
      </div>


      <!-- 封面 -->
      <div class="flex flex-align-center flex-justify-center addindex-border addindex-cover bg-full-img" :style="{background: `url(${ newArticle.Url })`}">
        
        <!-- 新增按钮 -->
        <div v-if="!newArticle.Url" class="flex flex-column flex-align-center" @click="addCoverAction">
          <img 
          src="~assets/icon/add-gray.svg" 
          class="addindex-cover-oparate-icon addindex-cover-oparate-icon-nobg"
          >
          <span class="font-l gray9 addindex-cover-addtext"> 封面 </span>    
        </div>
        
        <!-- 关闭按钮 -->
        <img 
        v-if="newArticle.Url" 
        src="~assets/icon/close.svg" 
        class="addindex-close addindex-icon"
        @click="deleteCoverAction"
        >
      </div>


      <vue-html5-editor :content="newArticle.Content" :height="170"></vue-html5-editor>
      <div class="addindex-placeholder"></div>
    </div>


    <div class="page-bottom">
      <div class="page-bottom-btn" @click="previewArticle">
        预览文章
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      titleLen : 60,
      briefLen : 280,
      titleCurrentLen:0,
      briefCurrentLen:0,
      newArticle:{
        Title:'',
        Url:'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3899933224,734271981&fm=85&s=6BFA72DA67080F5B80E9A626030020D7',
        Brief:'',
        CreateTime:Date.now(),
        Content:'请输入文章内容...'
      },
    }
  },
  methods:{
    /**
     * [addCoverAction 添加封面操作]
     * @Author   罗文
     * @DateTime 2018-10-12
     */
    addCoverAction() {
      let _this = this;
      app.uploadImgCloud()
      .then(res =>{
        _this.setData({
          ['newArticle.Url']:res.data
        })

        app.showToast('上传成功');
      })
      .catch(err => {
        console.log(err);
        app.showToast(err.description,2);
      })
    },

    /**
     * [deleteCoverAction 删除封面]
     * @Author   罗文
     * @DateTime 2018-10-12
     * @return   {[type]}   [description]
     */
    deleteCoverAction() {
      this.setData({
        ['newArticle.Url']:''
      })
    },


    previewArticle() {}
  },
  computed:{
    
  },
  created() {
    
  },
  mounted() {
    
  },
}
</script>
