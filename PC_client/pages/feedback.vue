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
        111
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

export default {
  async asyncData ({ params }) {
    await new Promise((resolve,reject)=> {
      if(window.wangEditor) resolve();
      let timer;

      isWangEditor();
      
      function isWangEditor() {
        timer = setTimeout(()=> {
          console.log(1)
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
    return {}
  },
  components: {
    'feedback-item':feedbackItem
  },
  methods:{

  },

  mounted() {
    console.log(2)
  }
}
</script>
