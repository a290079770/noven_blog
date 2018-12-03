<template>
  <section class="mc add-arc">
    <section >
      <h2 class="flex flex-align-center add-arc-info-title font-l">
        <figure class="add-arc-info-title-icon">
          <img class="full-img" src="~assets/icon/edit.svg">
        </figure>
        <span>
          新增文章
        </span>
      </h2>
    </section>

    <section class="add-arc-form">
      <div class="flex add-arc-form-item">
        <div class="flex flex-align-center flex-justify-end add-arc-form-item-left">
          <span class="primary font-lg">*&nbsp;</span>
          <span>文章标题</span>
        </div>
        <div class="flex pr add-arc-form-item-right">
          <input class="gray6 add-arc-form-input" type="text" placeholder="请输入文章标题">
          <p class="flex flex-justify-between add-arc-form-item-notice gray9 font-xs">
            <span>您最多可以输入<span class="primary">60</span>个字符</span>
            <span><span class="primary">0</span>/60</span>
          </p>
        </div>
      </div>

      <div class="flex add-arc-form-item">
        <div class="flex flex-align-center flex-justify-end add-arc-form-item-left">
          <span>文章简介</span>
        </div>
        <div class="flex pr add-arc-form-item-right">
          <textarea maxlength="280" placeholder="请输入文章简介" class="gray6 add-arc-form-textarea">
            
          </textarea>
          <p class="flex flex-justify-between add-arc-form-item-notice add-arc-form-item-notice-abs gray9 font-xs">
            <span>您最多可以输入<span class="primary">280</span>个字符</span>
            <span><span class="primary">0</span>/280</span>
          </p>
        </div>
      </div>

      <div class="flex add-arc-form-item">
        <div class="flex flex-align-center flex-justify-end add-arc-form-item-left">
          <span>文章封面</span>
        </div>
        <div class="flex pr add-arc-form-item-right">
          <div v-if="false" class="flex-center add-arc-form-cover">
            <img class="add-arc-form-cover-upload-icon" src="~assets/icon/add-gray.svg">
          </div>

          <figure class="pr add-arc-form-cover-has" :style="{background: 'url(https://img08.lechebangstatic.com/share/minapp/newCar/photo_3.jpg) no-repeat center', backgroundSize:'cover' }">
            <div class="add-arc-form-cover-has-close">
              <img class="full-img" src="~assets/icon/close-gray.svg">
            </div>
          </figure>
        </div>
      </div>


      <div class="flex add-arc-form-item">
        <div class="flex flex-align-center flex-justify-end add-arc-form-item-left">
          <span>文章内容</span>
        </div>
        <div class="flex pr add-arc-form-item-right">
          <div class="add-arc-editor" id="addArticleEditor">
            
          </div>
        </div>
      </div>

      <div class="flex add-arc-form-item">
        <div class="flex flex-align-center flex-justify-end add-arc-form-item-left">
        </div>
        <div class="flex add-arc-form-item-right add-arc-submit-btns">
          <el-button type="primary add-arc-submit-btn">预览文章</el-button>
          <el-button>放弃编辑</el-button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>

export default {
  async asyncData ({ params }) {
    await new Promise((resolve,reject)=> {
      if(window.wangEditor) resolve();
      let timer;

      isWangEditor();
      
      function isWangEditor() {
        timer = setTimeout(()=> {
          if(window.wangEditor) {
            clearTimeout(timer);
            resolve();
            return;
          }
          isWangEditor();
        }, 100)
      }
    })
  },
  data() {
    return {
      addEditor: null
    }
  },

  methods:{

  },

  mounted() {
    this.addEditor = new wangEditor('#addArticleEditor')
    //设置留言编辑器自定义配置
    this.addEditor.customConfig = this.getEditorConfig(1);
    this.addEditor.create()
  }
}
</script>
