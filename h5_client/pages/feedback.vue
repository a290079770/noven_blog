<template>
  <section class="preview">
    <vue-html5-editor :content="content" :height="500"></vue-html5-editor>
  </section>
</template>

<script>
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
  data() {
    return {
      fbEditor: null,
      content: '123', 
    }
  },

  methods:{},
  computed:{
    
  },
  created() {
    
  },
  async mounted() {
    //不知道为什么，写在head里的script会比mounted晚执行，导致获取不到wangEditor
    // this.fbEditor = await new Promise((resolve,reject) => {
    //   if(window.___E) resolve(new ___E('feedbackEditor'));

    //   let timer;

    //   isWangEditor();
      
    //   function isWangEditor() {
    //     timer = setTimeout(()=> {
    //       if(window.___E) {
    //         clearTimeout(timer);
    //         resolve(new ___E('feedbackEditor'));
    //         return;
    //       }
    //       isWangEditor();
    //     }, 100)
    //   }
    // }) 

    //设置留言编辑器自定义配置
    // this.fbEditor.customConfig = this.getEditorConfig(2);
    // this.fbEditor.init();
  },
}
</script>
