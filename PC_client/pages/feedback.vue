<template>
  <section class="mc feedback">
    <section class="feedback-title">
      <span>
        {{ type == 1 ? '远道而来，不如留下点什么...' : '读到这里了，说点什么吧...' }}
      </span>
      <span class="font-xs feedback-warning"> （温馨提示：禁止在留言和评论中散布恶意、违法信息）</span>
    </section>

    <section class="feedback-edit-container">
      <section id="feedbackEditor" class="feedback-edit">
      </section>
      <p class="flex flex-align-center feedback-edit-btns">
        <el-button size="small" @click="createFeedback(0)" type="primary">留言</el-button>
        <el-button size="small" @click="clearFeedback">清空</el-button>
      </p>
    </section>


    <section ref="feedbackTitle" class="feedback-title">
      {{ type == 1 ? '留言板' : '文章评论' }}（<span class="primary">{{totalCount}}</span>）
    </section>

    <section class="feedback-list">
      <feedback-item 
      :key="index" 
      v-for="(item,index) in dataList" 
      :item="item"
      @showReply="showReply($event,index)"
      @clearReplyText="clearReplyText(index)"
      @replyAction="replyAction(index)"
      />

      <section class="flex flex-justify-end feedback-page">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="cp"
          :page-size="ps"
          layout="pager"
          :total="total"
          :background="true"
          >
        </el-pagination>
      </section> 
    </section>

    
  </section>
</template>

<script>
import feedbackItem from '~/components/feedbackItem'
import { getCommentList , createComment } from '~/assets/service/commentService'
import Vue from 'vue';
export default {
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
    __dangerouslyDisableSanitizers: ['script']
  },

  props:{
    //1 - 留言板  2 - 文章评论
    type:{
      type:Number,
      default:1, 
    },
    //资源id
    resourceId:{
      type:Number,
      default: -1
    }
  },
  data() {
    return {
      dataList:[],
      fbEditor: null,
      content: '',
      ps: 10,
      cp: 1,
      total: 0,  //顶级留言数
      totalCount: 0, //所有的留言数
    }
  },
  components: {
    'feedback-item':feedbackItem
  },
  methods:{
    /**
     * [getDataList 获取评论列表]
     * @return {[type]} [description]
     */
    async getDataList(needScroll = true) {
      let { list , recordCount , totalCount } = await getCommentList({
        type: this.type,
        ps: this.ps,
        cp: this.cp,
        resourceId: this.resourceId
      });

      this.dataList = list.map(item => {
        //添加回复框显示和@对象
        item.isReplyShow = false;
        item.replyNickName = '';
        item.replyText = '';
        return item;
      });
      this.total = recordCount;
      this.totalCount = totalCount;


      if(!needScroll) return;
      this.$nextTick(function() {
        //获取feedbackTitle的位置
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let totalTop = 0;

        if(this.$refs.feedbackTitle &&  this.$refs.feedbackTitle.getBoundingClientRect) {
          let { top } = this.$refs.feedbackTitle.getBoundingClientRect();
          totalTop = top - 65 + scrollTop;
        }  
        window.scrollTo({
          top: totalTop,
          behavior: "smooth"
        })
      })
    },

    //创建留言
    async createFeedback(pid = 0) {
      let content = this.fbEditor.txt.text();
      let contentHtml = this.fbEditor.txt.html();

      this.setXSSWhiteList();
        
      //验证合法性，获取xss后的字符串
      let xssStr = this.validFeedback(content,contentHtml); 
      if(!xssStr) return;
      this.content = xssStr;

      //发起请求
      let res = await createComment({
        content: this.content,
        type: this.type,
        pid,
        resourceId: this.resourceId
      });

      this.fbEditor.txt.html('');
      this.$message.success('留言成功！');

      this.cp = 1;
      this.getDataList();
    },

    //清空留言
    async clearFeedback() {
      let confirm = await this.$confirm('确定清除编辑器中的留言信息？','提示');

      if(confirm) {
        //清空
        this.fbEditor.txt.html('');
      }
    },

    /**
     * [validFeedback 验证留言的必要信息]
     * @param  {[String]} content     [内容的纯文本，text类型]
     * @param  {[String]} contentHtml [内容的Html]
     * @return {[String]}             [xss处理后的内容]
     */
    validFeedback(content,contentHtml) {
      //验证登录
      if(!this.isLogin) {
        this.goTo('/login');
        return false; 
      }
      //非空
      if(!content) {
        this.$message.error('请添加留言内容');
        return false;
      }

      //验证xss后是否非空
      if(!filterXSS(contentHtml)){
        this.$message.error('留言内容含有非法内容');
        return false;
      }

      return filterXSS(contentHtml);
    },

    //当前页码
    handleCurrentChange(val) {
      this.cp = val;
      this.getDataList();
    },

    //显示当前评论的回复框
    showReply(replyNickName,index) {
      this.dataList = this.dataList.map(item => {
        //添加回复框显示和@对象
        item.isReplyShow = false;
        item.replyNickName = '';
        item.replyText = '';
        return item;
      });

      let item = this.dataList[index];
      item.replyNickName = replyNickName;
      item.isReplyShow = true;

      this.$set(this.dataList,index,item);
    },
    //清空当前回复框的内容
    clearReplyText(index) {
      this.$set(this.dataList[index],'replyText','');
    },

    //发起回复操作
    async replyAction(index) {
      //收集数据
      let { replyNickName , replyText , Id } = this.dataList[index];

      //验证合法性，获取xss后的字符串
      let xssStr = this.validFeedback(replyText,replyText,2); 
      if(!xssStr) return;

      //发起请求
      let res = await createComment({
        content: xssStr,
        type: this.type,
        pid: Id,
        resourceId: this.resourceId,
        replyNickName
      });

      this.$message.success('回复成功！');

      //这里为保持当前位置不变化，直接append一个Child进去
      let { NickName , CoverUrl } = this.userInfo;
      let reply = {
        Id:res,
        NickName,
        CoverUrl,
        CreateTime: this.dateFormat(Date.now(),'yyyy-mm-dd hh:MM:ss'),
        ReplyNickName: replyNickName,
        Content:xssStr
      }    

      this.dataList[index].Children.push(reply);

      let item = this.dataList[index];
      item.replyNickName = '';
      item.replyText = '';
      item.isReplyShow = false;

      this.$set(this.dataList,index,item);
    }
  },
  created() {
  },
  async mounted() {
    this.getDataList(false);

    //不知道为什么，写在head里的script会比mounted晚执行，导致获取不到wangEditor
    this.fbEditor = await new Promise((resolve,reject) => {
      if(window.wangEditor) resolve(new wangEditor('#feedbackEditor'));

      let timer;

      isWangEditor();
      
      function isWangEditor() {
        timer = setTimeout(()=> {
          if(window.wangEditor) {
            clearTimeout(timer);
            resolve(new wangEditor('#feedbackEditor'));
            return;
          }
          isWangEditor();
        }, 100)
      }
    }) 

    //设置留言编辑器自定义配置
    this.fbEditor.customConfig = this.getEditorConfig(2);
    this.fbEditor.create()
  },
  computed: {
    isLogin() {
      return this.getCookie('token');
    },

    userInfo() {
      //获取用户信息
      try {
        return JSON.parse(localStorage.userInfo);
      }catch(e) {
        return {}
      }
    }
  }
}
</script>
