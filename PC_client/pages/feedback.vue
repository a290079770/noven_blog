<template>
  <section class="mc feedback">
    <section class="feedback-title">
      <span>
        远道而来，不如留下点什么...
      </span>
      <span class="font-xs feedback-warning"> （温馨提示：禁止在留言和评论中散步恶意、违法信息）</span>
    </section>

    <section class="feedback-edit-container">
      <section id="feedbackEditor" class="feedback-edit">
      </section>
      <p class="flex flex-align-center flex-justify-end feedback-edit-btns">
        <el-button size="small" @click="createFeedback(0)" type="primary">留言</el-button>
        <el-button size="small" @click="clearFeedback">清空</el-button>
      </p>
    </section>


    <section ref="feedbackTitle" class="feedback-title">
      留言板（<span class="primary">{{totalCount}}</span>）
    </section>

    <section class="feedback-list">
      <feedback-item :key="index" v-for="(item,index) in dataList" :item="item"/>

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
    async getDataList() {
      let { list , recordCount , totalCount } = await getCommentList({
        type:1,
        ps: this.ps,
        cp: this.cp
      });

      this.dataList = list;
      this.total = recordCount;
      this.totalCount = totalCount;

      this.$nextTick(function() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      })
    },

    //创建留言
    async createFeedback(pid = 0) {
      //验证登录
      if(!this.isLogin) {
        this.goTo('/login');
        return 
      }
      //验证合法性
      let content = this.fbEditor.txt.text();
      let contentHtml = this.fbEditor.txt.html();
      //非空
      if(!content) {
        this.$message.error('请添加文章内容');
        return;
      }

      //验证xss后是否非空
      if(!filterXSS(contentHtml)){
        this.$message.error('文章内容含有非法内容');
        return;
      }

      this.content = filterXSS(contentHtml);

        //发起请求
      let res = await createComment({
        content: this.content,
        type: 1,
        pid,
        resourceId: - 1
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

    //当前页码
    handleCurrentChange(val) {
      this.cp = val;
      this.getDataList();
    },
  },
  created() {
    this.getDataList();
  },
  mounted() {
    this.fbEditor = new wangEditor('#feedbackEditor')
    //设置留言编辑器自定义配置
    this.fbEditor.customConfig = this.getEditorConfig(2);
    this.fbEditor.create()
  },
  computed: {
    isLogin() {
      return this.getCookie('token');
    }
  }
}
</script>
