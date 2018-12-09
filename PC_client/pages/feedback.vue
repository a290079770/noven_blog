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
    </section>


    <section class="feedback-title">
      留言板（<span class="primary">998</span>）
    </section>

    <section class="feedback-list">
      <feedback-item/>
      <feedback-item/>
    </section>
  </section>
</template>

<script>
import feedbackItem from '~/components/feedbackItem'
import { getCommentList } from '~/assets/service/commentService'

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
      fbEditor: null,
      ps: 10,
      cp: 1
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
      let list = await getCommentList({
        type:1,
        ps: this.ps,
        cp: this.cp
      });

      console.log(list)
    }
  },
  created() {
    this.getDataList();
  },
  mounted() {
    this.fbEditor = new wangEditor('#feedbackEditor')
    //设置留言编辑器自定义配置
    this.fbEditor.customConfig = this.getEditorConfig(2);
    this.fbEditor.create()
  }
}
</script>
