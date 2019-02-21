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
          <input v-model="articleInfo.Title" class="gray6 add-arc-form-input" type="text" placeholder="请输入文章标题" >
          <p class="flex flex-justify-between add-arc-form-item-notice gray9 font-xs">
            <span>您最多可以输入<span class="primary">{{titleLen}}</span>个字符</span>
            <span><span class="primary">{{titleCurrentLen}}</span>/{{titleLen}}</span>
          </p>
        </div>
      </div>

      <div class="flex add-arc-form-item">
        <div class="flex flex-align-center flex-justify-end add-arc-form-item-left">
          <span>文章简介</span>
        </div>
        <div class="flex pr add-arc-form-item-right">
          <textarea v-model="articleInfo.Brief" maxlength="280" placeholder="请输入文章简介" class="gray6 add-arc-form-textarea">
            
          </textarea>
          <p class="flex flex-justify-between add-arc-form-item-notice add-arc-form-item-notice-abs gray9 font-xs">
            <span>您最多可以输入<span class="primary">{{briefLen}}</span>个字符</span>
            <span><span class="primary">{{briefCurrentLen}}</span>/{{briefLen}}</span>
          </p>
        </div>
      </div>

      <div class="flex add-arc-form-item">
        <div class="flex flex-align-center flex-justify-end add-arc-form-item-left">
          <span>文章封面</span>
        </div>
        <div class="flex pr add-arc-form-item-right">
          <div class="flex flex-align-end" v-show="!articleInfo.Url">
            <el-upload
              ref="upload"
              :action="uploadParams.action"
              :multiple="uploadParams.multiple"
              :name="uploadParams.name"
              :accept="uploadParams.accept"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="previewImage"
              :auto-upload="false"
              >
              <div class="flex-center add-arc-form-cover">
                <img class="add-arc-form-cover-upload-icon" src="~assets/icon/add-gray.svg">
              </div>
            </el-upload>
            <div class="font-xs info add-arc-network-url">
              <span class="add-arc-network-text" v-if="!isUseNetImg" @click="isUseNetImg = true">网络图片</span>
              <span v-else>
                <input v-model="netImgUrl" class="gray6 add-arc-form-input add-arc-network-input" type="text" placeholder="请输入图片网络地址" >
                <el-button size="small" @click="addNetImg">添加</el-button>
              </span>
            </div>
          </div>

          <figure v-show="articleInfo.Url" class="pr add-arc-form-cover-has bg-full-img" :style="{background: `url(${articleInfo.Url})`}">
            <div @click="articleInfo.Url = ''" class="add-arc-form-cover-has-close">
              <img class="full-img" src="~assets/icon/close-gray.svg">
            </div>
          </figure>
        </div>
      </div>


      <div class="flex add-arc-form-item">
        <div class="flex flex-align-center flex-justify-end add-arc-form-item-left">
          <span class="primary font-lg">*&nbsp;</span>
          <span>文章内容</span>
        </div>
        <div class="flex pr add-arc-form-item-right">
          <div :class="`flex-center add-arc-editor-bar ${isEditorBarFixed ? 'add-arc-editor-bar-fixed' : 'add-arc-editor-bar-abs'}`" >
            <div class="add-arc-editor-bar-cont" id="addArticleEditorBar"></div>
          </div>
          <div class="add-arc-editor" id="addArticleEditor"></div>
        </div>
      </div>

      <div class="flex add-arc-form-item">
        <div class="flex flex-align-center flex-justify-end add-arc-form-item-left">
        </div>
        <div class="flex add-arc-form-item-right add-arc-submit-btns">
          <el-button type="primary" @click="previewArc">预览文章</el-button>
          <el-button @click="cancelEdit">放弃编辑</el-button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import {getArticleDetail} from '~/assets/service/articleService'
export default {
  async asyncData ({ app , redirect}) {
    //拦截非管理员用户
    let isAuth = await app.validUserInfo();
    if(!isAuth) redirect('/');
  },
  data() {
    return {
      addEditor: null,
      titleLen: 60,
      briefLen: 280,
      titleCurrentLen:0, //界面渲染用，当前输入了多少字
      briefCurrentLen:0, //界面渲染用，当前输入了多少字

      articleInfo:{
        Title:'',
        Url:'',
        Brief:'',
        CreateTime:Date.now(),
        Content:''
      },

      uploadParams: this.getUploadParams(),
      isSubmit: false,
      isNeedUpload: false, //是否需要发起上传
      isUseNetImg: false,
      netImgUrl:'',
      isEditorBarFixed: false, //是否固定在页面顶部
    }
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


  methods:{
    //去预览文章
    previewArc() {

      let { articleInfo } = this;
      if(!articleInfo.Id) articleInfo.CreateTime = Date.now();

      //获取编辑器的html
      articleInfo.Content = this.addEditor.txt.html();    

      this.setXSSWhiteList();

      //数据验证
      if(!this.validNeccessaryField(articleInfo)) return;


      //上传封面
      if(this.isNeedUpload) {
        this.isSubmit = true;
        this.$refs.upload.submit();
      }else 
        this.toPreview()
    },


    //验证新增文章必须的字段
    validNeccessaryField({ Title }) {
      let neccess = [ 'Title','Content' ];
      let isPass = true;

      for( let i = 0 ; i < neccess.length ; i ++) {
        let key = neccess[i];
        switch (key) {
          case 'Title':
            //非空
            if(!Title || !Title.replace(/ /g,'')) {
              this.$message.error('请添加文章标题');
              isPass = false;
            }

            break;
          case 'Content':
            let Content = this.addEditor.txt.text();
            let ContentHtml = this.addEditor.txt.html();
            //非空
            if(!Content) {
              isPass = false;
              this.$message.error('请添加文章内容');
              break;
            }

            //验证xss后是否非空
            if(!filterXSS(ContentHtml)){
              isPass = false;
              this.$message.error('文章内容含有非法内容');
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
      this.goTo('/preview','',true);
    },

    //放弃编辑
    async cancelEdit() {
      let res = await this.$confirm('确定放弃编辑文章？','提示').catch(()=> false)
      if(res) this.$router.go(-1);
    },
    /**
     * [inputAction 输入事件]
     * @Author   罗文
     * @DateTime 2018-09-30
     * @param [ Number ]  type [3 - 标题  4 - 简介]
     * @param [ String ]  value [当前输入框中的值]
     * @return   {[type]}   [description]
     */
    inputAction( value , type) {
      //type 3 - 标题    4 - 简介
      const { titleLen, briefLen } = this;
      //获取当前长度
      const computedLen = this.getLen(value);
      //最后处理之后的长度
      let lastLen = computedLen; 
      if( type == 3 ) {
        if( computedLen > titleLen ) {
          this.$set(this.articleInfo,'Title',this.getSliceStr(value,titleLen));
          lastLen = titleLen;
        }else {
          this.$set(this.articleInfo,'Title',value);
        }

        this.titleCurrentLen = lastLen;
      }else if( type == 4 ) {
        if( computedLen > briefLen ) {
          this.$set(this.articleInfo,'Brief',this.getSliceStr(value,briefLen));

          lastLen = briefLen;
        }else {
          this.$set(this.articleInfo,'Brief',value);
        }

        this.briefCurrentLen = lastLen;
      }
    },

    //预览选择的图片
    previewImage({ raw: file }) {
      //如果点击的发布文章，则提交
      if( this.isSubmit ) return;

      //拦截默认上传，预览图片
      var rd = new FileReader();//创建文件读取对象
      rd.readAsDataURL(file);//文件读取装换为base64类型
      let _this = this;
      rd.onloadend = function(e) {
          //加载完毕之后获取结果赋值给img
        _this.$set(_this.articleInfo,'Url',this.result);
        _this.isNeedUpload = true;
        _this.isUseNetImg = false;
        _this.netImgUrl = '';
      }
    },

    //上传成功
    handleAvatarSuccess(res, file) {
      this.isSubmit = false;

      let { code , description , data } = res;
      if( code !== 200) {
        this.$message.error(description);
        return 
      }

      this.$set(this.articleInfo,'Url',data.url.replace(/\\/g,'/'));

      //去跳转到预览页
      this.toPreview();
    },

    //添加网络图片做为封面
    addNetImg() {
      let { netImgUrl } = this;
      if(!netImgUrl || !netImgUrl.replace(/ /g,'')) {
        this.$message.error('请输入图片网络地址');
        return;
      }

      this.$set(this.articleInfo,'Url',netImgUrl.replace(/\\/g,'/'));
      this.isUseNetImg = false;
      this.netImgUrl = '';
    },

    //设置编辑器导航条的位置
    setEditBarFixed() {
      this.$nextTick(function() {
        let bar = document.querySelector('.add-arc-editor-bar');
        
        let { y } = bar.getBoundingClientRect();

        //窗口滚动的时候不断获取当前位置，如果超过bar，就设置fixed，否则absolute
        let _this = this;
        window.onscroll = function() {
          let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          //根据当前元素位置，执行固定定位
          _this.isEditorBarFixed = scrollTop > y;
        }
      })
    }
  },

  created() {
    //如果previewArticleData 与 id 同时存在，优先取用previewArticleData
    if(sessionStorage.previewArticleData) {
      //从预览页返回编辑的时候，sessionStorage里会有 previewArticleData数据 
      try {
        this.articleInfo = JSON.parse(sessionStorage.previewArticleData);
        sessionStorage.removeItem('previewArticleData')
      }catch(e) {
        this.$message.error('解析被修改文章的数据失败！');
      }
    }
  },

  async mounted() {
    this.addEditor = await new Promise((resolve,reject) => {
      if(window.wangEditor) resolve(new wangEditor('#addArticleEditorBar','#addArticleEditor'));

      let timer;

      isWangEditor();
      
      function isWangEditor() {
        timer = setTimeout(()=> {
          if(window.wangEditor) {
            clearTimeout(timer);
            resolve(new wangEditor('#addArticleEditorBar','#addArticleEditor'));
            return;
          }
          isWangEditor();
        }, 100)
      }
    }) 

    //设置留言编辑器自定义配置
    this.addEditor.customConfig = this.getEditorConfig(1);
    this.addEditor.create()


    if(this.articleInfo.Content) {
      this.addEditor.txt.html(this.articleInfo.Content);
      this.setEditBarFixed();
      return
    }

    if(this.$route.query.id) {
      //修改文章的时候，url会携带文章id
      let { id } = this.$route.query;
      this.articleInfo = await getArticleDetail(id);
      this.addEditor.txt.html(this.articleInfo.Content);
      this.setEditBarFixed();
      return
    }

    //如果都没有，则是新增
    
    this.setEditBarFixed();
  },

  watch: {
    'articleInfo.Title': function (nv) {
      this.inputAction(nv,3)
    },
    'articleInfo.Brief': function (nv) {
      this.inputAction(nv,4)
    },
  },

  beforeDestroy() {
    // sessionStorage.removeItem('previewArticleData');
  }
}
</script>
