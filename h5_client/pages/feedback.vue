<template>
  <section class="feedback">

    <section>
      <div class="feedback-title">
        <div>
          {{ type == 1 ? '远道而来，不如留下点什么...' : '读到这里了，说点什么吧...' }}
        </div>
        <div class="font-xs feedback-warning"> 温馨提示：禁止在留言和评论中散布恶意、违法信息</div>
      </div>
      <textarea v-model="content" class="gray6 fd-editor">
        
      </textarea>

      <p class="flex flex-align-center feedback-edit-btns">
        <Button type="primary" customClass="feedback-item-edit-btn" @click="createFeedback(0)">
          留言
        </Button> 
        <Button type="info" :plain="true" customClass="feedback-item-edit-btn" @click="clearFeedback">
          清空
        </Button> 
      </p>
    </section>
    
    <section class="fd-list-content"> 
      <section ref="feedbackTitle" class="fd-list-title">
        {{ type == 1 ? '留言板' : '文章评论' }}（<span class="primary">{{totalCount}}</span>）
      </section>
      
      <div class="comment-item-skeleton" v-for="item in skeleton" v-if="!hasGotData && dataList.length < 1">
       <img class="full-img" :src="item">
      </div>
      <section v-if="hasGotData && dataList.length > 0" class="fd-list-cont">
        <feedback-item 
        :key="index" 
        v-for="(item,index) in dataList" 
        :item="item"
        :style="{borderBottom: index === dataList.length - 1 ? 'none' : '1px solid #e0e0e0'}"
        @showReply="showReply($event,index)"
        @clearReplyText="clearReplyText(index)"
        @replyAction="replyAction(index)"
        />
        
      </section>

      <section v-if="hasGotData && dataList.length < 1" class="flex-center font-xs gray9 fd-list-cont">
        暂无{{ type == 1 ? '留言' : '评论' }}，快去抢个沙发～
      </section>
    </section>
    
  </section>
</template>

<script>
import feedbackItem from '~/components/feedbackItem'
import Button from '~/components/Button';
import { getCommentList , createComment } from '~/assets/service/commentService'
export default {
  head: {
    script: [ 
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
      //判定首次加载数据
      skeleton:[
        '/comment-item-skeleton.jpg',
        '/comment-item-skeleton.jpg',
      ],
      dataList:[],
      content: '',
      ps: 10,
      cp: 1,
      total: 0,  //顶级留言数
      totalCount: 0, //所有的留言数
      hasGotData: false, //还未获取到评论数据的时候，不展示无数据的图片
    }
  },
  components: {
    'feedback-item':feedbackItem,
    Button
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

      list = list.map(item => {
        //添加回复框显示和@对象
        item.isReplyShow = false;
        item.replyNickName = '';
        item.replyText = '';
        return item;
      })

      this.dataList = this.cp > 1 ? [...this.dataList,...list]: list;
      this.total = recordCount;
      this.totalCount = totalCount;
      this.hasGotData = true

      if(!needScroll) return;

      this.$nextTick(function() {
        //获取feedbackTitle的位置
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let totalTop = 0;

        if(this.$refs.feedbackTitle &&  this.$refs.feedbackTitle.getBoundingClientRect) {
          let { top, height } = this.$refs.feedbackTitle.getBoundingClientRect();
          totalTop = top + scrollTop;
        }  
        window.scrollTo({
          top: totalTop,
          behavior: "smooth"
        })
      })
    },

    //创建留言
    async createFeedback(pid = 0) {
      let { content } = this;

      //验证合法性，获取xss后的字符串
      let xssStr = await this.validFeedback(content,content); 
      if(!xssStr) return;
      this.content = xssStr;

      //发起请求
      let res = await createComment({
        content: this.content,
        type: this.type,
        pid,
        resourceId: this.resourceId
      });

      this.content = '';
      this.$message('留言成功！');

      this.cp = 1;
      this.getDataList();
    },

    //清空留言
    async clearFeedback() {
      let confirm = await this.$confirm('确定清除编辑器中的留言信息？','提示').catch(()=>null)

      //清空
      if(confirm) this.content = '';
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


      //点击回复，自动聚焦
      this.$nextTick(function() {
        document.querySelector(`#feedbackTextarea${item.Id}`).focus();
      })
    },
    //清空当前回复框的内容
    clearReplyText(index) {
      this.$set(this.dataList[index],'replyText','');
    },

    /**
     * [validFeedback 验证留言的必要信息]
     * @param  {[String]} content     [内容的纯文本，text类型]
     * @param  {[String]} contentHtml [内容的Html]
     * @return {[String]}             [xss处理后的内容]
     */
    async validFeedback(content,contentHtml) {
      return new Promise(async (resolve,reject) => {
        //验证登录
        if(!this.isLogin()) {
          this.goTo('/login');
          resolve(false);
          return; 
        }
        //非空
        if(!content) {
          this.$message('请添加留言内容');
          resolve(false);
          return;
        }

        //判定xss插件是否引入
        let xssInject = await this.validXssFilterLoaded();
        if(!xssInject) {
          resolve(false);
          return;
        }
        

        //验证xss后是否非空
        if(!filterXSS(contentHtml)){
          this.$message('留言内容含有非法内容');
          resolve(false);
          return;
        }

        resolve(filterXSS(contentHtml));
      }) 
    },

    //发起回复操作
    async replyAction(index) {
      //收集数据
      let { replyNickName , replyText , Id } = this.dataList[index];

      //验证合法性，获取xss后的字符串
      let xssStr = await this.validFeedback(replyText,replyText,2); 
      if(!xssStr) return;

      //发起请求
      let res = await createComment({
        content: xssStr,
        type: this.type,
        pid: Id,
        resourceId: this.resourceId,
        replyNickName
      });

      this.$message('回复成功！');

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
    },

    //判定xss插件是否引入
    async validXssFilterLoaded() {
      return new Promise(async (resolve,reject)=>{
        let count = 5;
        while(count -- ) {
          if(!window.filterXSS) await new Promise((resolve)=>setTimeout(resolve,1000));
          else break;
        }

        if(!window.filterXSS) {
          this.$message('程序好像跑偏了，请刷新试试呢～!');
          resolve(false);
          return 
        } 

        this.setXSSWhiteList();
        resolve(true);
      })
    }
  },
  computed:{
    userInfo() {
      //获取用户信息
      try {
        return JSON.parse(localStorage.userInfo);
      }catch(e) {
        return {}
      }
    }
  },
  created() {
    
  },
  mounted() {
    this.getDataList(false);

    this.onReachBottom(()=>{
      let { ps, cp , total } = this;
      //cp > 1则是请求加载更多，cp = 1 则是首次加载
      if( cp > 1 && ps * cp >= total ) return; 
      this.cp ++;
      this.getDataList(false);
    })
  },
  beforeDestroy() {
    window.onscroll = null;
  }
}
</script>
