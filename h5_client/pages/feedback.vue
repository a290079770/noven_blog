<template>
  <section class="feedback">

    <section>
      <div class="feedback-title">
        <div>
          {{ type == 1 ? '远道而来，不如留下点什么...' : '读到这里了，说点什么吧...' }}
        </div>
        <div class="font-xs feedback-warning"> 温馨提示：禁止在留言和评论中散布恶意、违法信息</div>
      </div>
      <textarea ref="editor" class="gray6 fd-editor">
        
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
    
    <section class="fd-list-title">
      {{ type == 1 ? '留言板' : '文章评论' }}（<span class="primary">{{totalCount}}</span>）
    </section>
    

    <section v-if="hasGotData && dataList.length > 0" class="fd-list-cont">
      <feedback-item 
      :key="index" 
      v-for="(item,index) in dataList" 
      :item="item"
      @showReply="showReply($event,index)"
      @clearReplyText="clearReplyText(index)"
      @replyAction="replyAction(index)"
      />


      
    </section>

    <section v-else class="flex-center font-xs gray9 fd-list-cont">
      暂无{{ type == 1 ? '留言' : '评论' }}，快去抢个沙发～
    </section>
    
  </section>
</template>

<script>
import feedbackItem from '~/components/feedbackItem'
import Button from '~/components/Button';
import { getCommentList , createComment } from '~/assets/service/commentService'
export default {
  head: {
    link: [
    ],
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
      dataList:[],
      fbEditor: null,
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

      this.dataList = list.map(item => {
        //添加回复框显示和@对象
        item.isReplyShow = false;
        item.replyNickName = '';
        item.replyText = '';
        return item;
      });
      this.total = recordCount;
      this.totalCount = totalCount;
      this.hasGotData = true

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
  computed:{
    
  },
  created() {
    
  },
  async mounted() {
    this.getDataList(false);
  },
}
</script>
