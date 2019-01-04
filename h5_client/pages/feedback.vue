<template>
  <section class="preview">
    <section id="feedbackEditor" class="feedback-edit"></section>
      
  </section>
</template>

<script>
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
  data() {
    return {
      fbEditor: null,
      content: '',
    }
  },

  methods:{},
  computed:{
    
  },
  created() {
    
  },
  async mounted() {
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
}
</script>
