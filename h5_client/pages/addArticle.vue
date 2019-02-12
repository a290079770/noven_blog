<template>
  <section class="add-arc">
    <div class="addindex-cont">
      <!-- 标题 -->
      <div class="font addindex-border addindex-title">
        <input 
        class="addindex-title-input" 
        placeholder="请输入文章标题" 
        autofocus
        @input="inputAction($event,1)"
        v-model="articleInfo.Title"
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
         @input="inputAction($event,2)"
         v-model="articleInfo.Brief"
         />
         
      </div>

      <div class="flex flex-align-center flex-justify-between gray9 font updateinfo-notice">
        <span> 您最多可以输入<span class="updateinfo-notice-hasinput">{{ briefLen }}</span>个字符 </span>    
        <span> <span class="updateinfo-notice-hasinput"> {{ briefCurrentLen }} </span>     / {{ briefLen }}</span>     
      </div>


      <!-- 封面 -->
      <div class="pr flex flex-align-center flex-justify-center addindex-border addindex-cover bg-full-img" :style="{background: `url(${ articleInfo.Url })`}">
        
        <!-- 新增按钮 -->
        <vue-core-image-upload
          v-if="!articleInfo.Url"
          :crop="false"
          :credentials="false"
          inputOfFile="file"
          :compress="50"
          :max-file-size="500 * 1024 * 1024"
          :url="getUploadParams().action" 
          @imageuploaded="imageuploaded"
          @errorhandle="errorhandle"
          >
          <div class="flex flex-column flex-align-center">
            <img 
            src="~assets/icon/add-gray.svg" 
            class="addindex-cover-oparate-icon addindex-cover-oparate-icon-nobg"
            >
            <span class="font-l gray9 addindex-cover-addtext"> 封面 </span>    
          </div>
        </vue-core-image-upload>
        
        <!-- 关闭按钮 -->
        <img 
        v-if="articleInfo.Url" 
        src="~assets/icon/close.svg" 
        class="addindex-close addindex-icon"
        @click="deleteCoverAction"
        >

        <div v-if="!articleInfo.Url" class="font-l info addindex-netImg-text" @click="isUseNetImg = true">
          网络图片
        </div>
      </div>

      <div class="flex addindex-netImg" v-if="isUseNetImg">
        <input 
          class="addindex-title-input addindex-netImg-input" 
          placeholder="请输入图片网络地址" 
          v-model="netImgUrl"
        />
        <Button plain type="info" customClass="addindex-netImg-btn" @click="addNetImg">
          添加
        </Button> 
      </div>


      <vue-html5-editor @change="updateContent" :content="articleInfo.Content" :height="170"></vue-html5-editor>
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
import {getArticleDetail} from '~/assets/service/articleService'
import VueCoreImageUpload from 'vue-core-image-upload'
import Button from '~/components/Button';
export default {
  async asyncData ({ app , redirect}) {
    //拦截非管理员用户
    let isAuth = await app.validUserInfo();
    if(!isAuth) redirect('/');
  },
  head: {
    script: [ 
      { 
        src: 'https://cdn.bootcss.com/wangEditor/3.1.1/wangEditor.min.js',
      },
      {  
        src: 'https://cdn.bootcss.com/js-xss/0.3.3/xss.min.js',
        defer:"defer",
        body: true
      },
    ],
    __dangerouslyDisableSanitizers: ['script'],
    title:'编辑文章'
  },
  data() {
    return {
      titleLen : 60,
      briefLen : 280,
      titleCurrentLen:0,
      briefCurrentLen:0,
      articleInfo:{
        Title:'',
        Url:'',
        Brief:'',
        CreateTime:Date.now(),
        Content:''
      },
      isUseNetImg: false,
      netImgUrl:'',
    }
  },
  components:{
    'vue-core-image-upload': VueCoreImageUpload,
    Button
  },
  methods:{

    /**
     * [deleteCoverAction 删除封面]
     * @Author   罗文
     * @DateTime 2018-10-12
     * @return   {[type]}   [description]
     */
    deleteCoverAction() {
      this.$set(this.articleInfo,'Url','');
    },

    //更新内容
    updateContent(e) {
      this.articleInfo.Content = e;
    },


   /**
    * [inputAction 输入事件]
    * @Author   罗文
    * @DateTime 2019-01-14
    * @param    {[type]}   event [事件对象]
    * @param    {[Number]}   type  [1 - 标题  2 - 简介]
    * @return   {[type]}         [description]
    */
   inputAction(event,type) {
      let value = event.target.value;
      //type 3 - 昵称输入    4 - 简介
      const { titleLen = 60, briefLen = 280 } = this;
      //获取当前长度
      const computedLen = this.getLen(value);

      //最后处理之后的长度
      let lastLen = computedLen; 
      if( type == 1 ) {
        if( computedLen > titleLen ) {
          this.articleInfo.Title = this.getSliceStr(value,titleLen)
          lastLen = titleLen;
        }else {
          this.articleInfo.Title = value
        }

        this.titleCurrentLen = lastLen;
      }else if( type == 2 ) {
        if( computedLen > briefLen ) {
          this.articleInfo.Brief = this.getSliceStr(value,briefLen)
          lastLen = briefLen;
        }else {
          this.articleInfo.Brief = value
        }

        this.briefCurrentLen = lastLen;
      }
    },

    //去预览文章
    previewArticle() {
      let { articleInfo } = this;
      if(!articleInfo.Id) articleInfo.CreateTime = Date.now();

      //获取编辑器的html
      this.setXSSWhiteList();

      //数据验证
      if(!this.validNeccessaryField(articleInfo)) return;

      this.toPreview();
      return

      //上传封面
      if(this.isNeedUpload) {
        this.isSubmit = true;
        this.$refs.upload.submit();
      }else 
        this.toPreview()
    },


    //验证新增文章必须的字段
    validNeccessaryField({ Title,Content }) {
      let neccess = [ 'Title','Content' ];
      let isPass = true;

      for( let i = 0 ; i < neccess.length ; i ++) {
        let key = neccess[i];
        switch (key) {
          case 'Title':
            //非空
            if(!Title || !Title.replace(/ /g,'')) {
              this.$message('请添加文章标题');
              isPass = false;
            }

            break;
          case 'Content':
            let ContentHtml = Content;
            //非空
            if(!Content) {
              isPass = false;
              this.$message('请添加文章内容');
              break;
            }

            //验证xss后是否非空
            if(!filterXSS(ContentHtml)){
              isPass = false;
              this.$message('文章内容含有非法内容');
              break;
            }

            this.articleInfo.Content = filterXSS(ContentHtml).replace(/text-decoration-line/g,'text-decoration');
            break;      
        }
        
        if(!isPass) break;
      }
      

      return isPass;
    },

    //去预览，讲当前页面的数据存入本地
    toPreview() {
      sessionStorage.setItem('previewArticleData', JSON.stringify(this.articleInfo));

      let { id } = this.$route.query;
      let query = id ? `id=${id}` : '';
      this.goTo('/preview',query,true);
    },

    imageuploaded(res) {
      let { code , data, description } = res;

      if(code !== 200) {
        this.$message(description);
        return;
      }

      this.$set(this.articleInfo,'Url',data.url);
      this.isUseNetImg = false;
      this.netImgUrl = '';
    },
    errorhandle() {
      this.$message('图片上传出错！');
      this.isUseNetImg = false;
      this.netImgUrl = '';
    },

    //添加网络图片做为封面
    addNetImg() {
      let { netImgUrl } = this;
      if(!netImgUrl || !netImgUrl.replace(/ /g,'')) {
        this.$message('请输入图片网络地址');
        return;
      }

      this.$set(this.articleInfo,'Url',netImgUrl.replace(/\\/g,'/'));
      this.isUseNetImg = false;
      this.netImgUrl = '';
    },
  },
  computed:{
    
  },
  async created() {
    //如果previewArticleData 与 id 同时存在，优先取用previewArticleData
    if(sessionStorage.previewArticleData) {
      //从预览页返回编辑的时候，sessionStorage里会有 previewArticleData数据 
      try {
        this.articleInfo = JSON.parse(sessionStorage.previewArticleData);
        sessionStorage.removeItem('previewArticleData')
      }catch(e) {
        this.$message.error('解析被修改文章的数据失败！');
      }
    }else if(this.$route.query.id) {
      //修改文章的时候，url会携带文章id
      let { id } = this.$route.query;
      this.articleInfo = await getArticleDetail(id);
    }

    //如果都没有，则是新增
  },
  mounted() {
    this.setPageTitle('编辑文章');
  },
}
</script>
