const app = getApp();
const { pick } = require('../../../noven/utils/objectUtil')
const { Storage } = require('../../../noven/storage')

Page({
  data:{
    pageTitle:'',
    statusBarHeight:0,
    titleBarHeight:0,
    text:'',
    index:null,
    isEdit:false
  },
  onLoad(options) {
    const { keys } = Storage.getInfoSync();
    let isEdit = keys.includes('currentText');

    this.setData({
      pageTitle:'编辑文本',
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight'),
      index: options.index ?  + options.index : null,  //注意，url传过来的参数，都是字符串！！！
      isEdit: keys.includes('currentText'),
      text: isEdit ? Storage.getSync('currentText') : '',
    })

    Storage.remove('currentText');
  },

  textareaInput({ detail: { value } }) {
    this.data.text = value;
  },

  //提交文章的编辑
  sumbitAction() {
    const { index } = this.data;
    let data = pick(this.data,['text','index','isEdit']);

    //因为是回退操作，需要将数据存到Storage中
    Storage.set('textData',data)
    .then(() => {
      app.goBack();
    }) 
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})