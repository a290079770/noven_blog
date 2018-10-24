const app = getApp();
const { getLen , getSliceStr } = require('../../../noven/utils/stringUtil');
const { Storage } = require('../../../noven/storage')

Page({
  data:{
    statusBarHeight:0,
    titleBarHeight:0,
    newArticle:{
      Title:'',
      Url:'',
      Brief:'',
      CreateTime:Date.now(),
      Content:[]
    },
    contentList:[
      // {
      //   showBtns:false,
      //   type:'text',
      //   value:'这是一段文字',
      // },
      // {
      //   showBtns:false,
      //   type:'img',
      //   value:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   desc:'',    //图片描述，展示的时候放在图片上面
      // },
    ],
    showBtns:false,
    titleLen : 60,
    briefLen : 280,
    titleCurrentLen:0,
    briefCurrentLen:0,
  },
  onLoad(options) {
    this.setData({
      statusBarHeight:Storage.getSync('statusBarHeight'),
      titleBarHeight: Storage.getSync('titleBarHeight'),
    })
    //这个界面是新增和修改通用，所以在修改的时候，需要自动设置数据
    Storage
    .get('previewArticleData')
    .then( ({ data })=>{
       if( data ) {
          let contentList = data.Content.map( item =>{
             item.showBtns = false;
             return item; 
          })

          this.setData({
            
            newArticle:data,
            contentList,
            showBtns:false,
            titleCurrentLen:getLen(data.Title),
            briefCurrentLen:getLen(data.Brief)
          })
       }
    }) 
    .catch(()=>{})
  },

  onShow() {
    //每次到这个页面，都需要查一下Storage中是否存在textData，如果存在，则是从编辑文字界面返回的
    Storage.get('textData')
    .then( ({ data }) => {
      if( data ) {
        //如果存在，则是从编辑文字界面返回的，需要更新对应的界面
        const { text , index , isEdit} = data;

        let { contentList } = this.data; 
        let newPara = {
          showBtns:false,
          type:'text',
          value:text,
        }

        if(!index && index !== 0) {
          //数组的开头添加
          contentList.unshift(newPara);
        }else {
          //关闭添加按钮
          contentList = contentList.map( item => {
            item.showBtns = false;
            return item;
          })

          if( isEdit ) {
            let current = contentList[index];
            current.type == 'text' ? (contentList[index].value = text) : (contentList[index].desc = text);
          }else {
            //需要新增一条数据
            contentList.splice(index + 1,0,newPara);
          }
        }

        this.setData({
          contentList,
          showBtns :false
        })
        
        Storage.remove('textData');
      }
    })
    .catch(()=>{})

  },

  onUnload() {
    //返回的时候，移除掉当前编辑
    Storage.remove('previewArticleData').catch(()=>{})
  },


  /**
   * [inputAction 输入事件]
   * @Author   罗文
   * @DateTime 2018-09-30
   * @return   {[type]}   [description]
   */
  inputAction({ currentTarget :{ dataset : { type }} ,detail : { value } }) {
    //type 3 - 昵称输入    3 - 简介
    const { titleLen = 60, briefLen = 280 } = this.data;
    //获取当前长度
    const computedLen = getLen(value);

    //最后处理之后的长度
    let lastLen = computedLen; 

    if( type == 3 ) {
      if( computedLen > titleLen ) {
        this.setData({
          ['newArticle.Title']: getSliceStr(value,titleLen)
        })
        lastLen = titleLen;
      }else {
        this.setData({
          ['newArticle.Title']:value
        })
      }

      this.setData({
        titleCurrentLen: lastLen
      })
    }else if( type == 4 ) {
      if( computedLen > briefLen ) {
        this.setData({
          ['newArticle.Brief']: getSliceStr(value,briefLen)
        })

        lastLen = briefLen;
      }else {
        this.setData({
          ['newArticle.Brief']:value
        })
      }

      this.setData({
        briefCurrentLen: lastLen
      })
    }
  },

  /**
   * [addCoverAction 添加封面操作]
   * @Author   罗文
   * @DateTime 2018-10-12
   */
  addCoverAction() {
    let _this = this;
    app.uploadImgCloud()
    .then(res =>{
      _this.setData({
        ['newArticle.Url']:res.data
      })

      app.showToast('上传成功');
    })
    .catch(err => {
      console.log(err);
      app.showToast(err.description,2);
    })
  },

  /**
   * [deleteCoverAction 删除封面]
   * @Author   罗文
   * @DateTime 2018-10-12
   * @return   {[type]}   [description]
   */
  deleteCoverAction() {
    this.setData({
      ['newArticle.Url']:''
    })
  },

  previewCoverAction() {
    wx.previewImage({
      urls:[this.data.newArticle.Url],
      current: this.data.newArticle.Url
    })
  },

  /**
   * [showBtns 显示隐藏添加段落]
   * @Author   罗文
   * @DateTime 2018-10-12
   * @param {[Number]} index [循环的第几个添加按钮]
   * @return   {[type]}   [description]
   */
  showBtns({ currentTarget :{ dataset : { index } } }) {
    if(!index && index !== 0) {
      //第一个添加按钮
      this.setData({
        showBtns:!this.data.showBtns
      })
    }else {
      //其他循环的添加按钮
      let contentList = this.data.contentList.map( ( citem,cindex ) => {
        if( index === cindex) citem.showBtns = !citem.showBtns;
        return citem;
      })
      this.setData({
        contentList
      })
    }
  },


  /**
   * [upordownParagraphAction 下移或者上移一段文本]
   * @Author   罗文
   * @DateTime 2018-10-12
   * @param {[Number]} index [循环的第几个]
   * @param {[Number]} type [1 - 下移  -1 - 上移]
   * @return   {[type]}   [description]
   */
  upordownParagraphAction({ currentTarget :{ dataset : { index , type } } }) {
    let { contentList } = this.data;
    const current =contentList[index] ;

    contentList.splice(index,1);
    contentList.splice(index + type,0,current);

    this.setData({
      contentList
    })
  },


  /**
   * [showBtns 移除一段文本]
   * @Author   罗文
   * @DateTime 2018-10-12
   * @param {[Number]} index [循环的第几个]
   * @return   {[type]}   [description]
   */
  closeParagraph({ currentTarget :{ dataset : { index } } }) {
    app.showModal({
      title:'提示',
      content:'确定删除该段落吗？',
      confirmColor:'#d13954'
    })
   .then(() => {
     this.data.contentList.splice( index , 1 );

     this.setData({
       contentList:this.data.contentList
     })
   })
   .catch(() => {
     
   })
  },


  /**
   * [showBtns 添加一个图片段落]
   * @Author   罗文
   * @DateTime 2018-10-12
   * @param {[Number]} index [循环的第几个]
   * @return   {[type]}   [description]
   */
  addImgParagraph({ currentTarget :{ dataset : { index } } }) {
    let _this = this;
    app.uploadImgCloud()
    .then(res =>{
      let { contentList } = _this.data; 
      let newPara = {
        showBtns:false,
        type:'img',
        value:res.data,
        desc:'',    //图片描述，展示的时候放在图片上面
      }

      if(!index && index !== 0) {
        //数组的开头添加
        contentList.unshift(newPara);
      }else {
        //关闭添加按钮
        contentList = contentList.map( item => {
          item.showBtns = false;
          return item;
        })
        contentList.splice(index + 1,0,newPara);
      }

      _this.setData({
        contentList,
        showBtns :false
      })

      app.showToast('上传成功');
    })
    .catch(err => {
      console.log(err);
      app.showToast(err.description,2);
    })
  },

  /**
   * [showBtns 添加一个文字段落]
   * @Author   罗文
   * @DateTime 2018-10-12
   * @param {[Number]} index [循环的第几个]
   * @return   {[type]}   [description]
   */
  addTextParagraph({ currentTarget :{ dataset : { index , currentText } } }) {
    if(!index && index !== 0) {
      //点击的第一个，这个时候是新增
      app.goTo({
        path:'/pages/addArticle/text/addText'
      });
    }else {
      if(currentText || currentText === '') {
         //因为文本可能数据量非常大，所以存Storage
         Storage.setSync('currentText',currentText);
      }

      app.goTo({
        path:'/pages/addArticle/text/addText',
        query:{
          index
        }
      });
    }
  },

  //预览文章
  previewArticle() {
    //收集数据
    let isPass = this.validNeccessaryField();

    if(!isPass) return;

    //收集数据
    let Content = this.data.contentList.slice(0);
    this.data.newArticle.Content = Content.map( item => {
       delete item.showBtns;
       return item;
    })
    
    this.data.newArticle.CreateTime = Date.now();


    Storage.set('previewArticleData',this.data.newArticle)
    .then(() => {
      app.goTo({
        path:'/pages/addArticle/previewArticle/previewArticle'
      })
    })
  },

  validNeccessaryField() {
    const Content = this.data.contentList;
    const { Title } = this.data.newArticle;

    let neccess = [ 'Title','Content' ];
    let isPass = true;

    for( let i = 0 ; i < neccess.length ; i ++) {
      let key = neccess[i];
      switch (key) {
        case 'Title':
          //非空
          if(!Title || !Title.replace(/ /g,'')) {
            app.showToast('请添加标题',2);
            isPass = false;
          }

          break;
        case 'Content':
          //非空
          if( Content.length < 1) {
            app.showToast('请添加内容',2);
            isPass = false;
          }

          //内容列表中，至少要有一项有数据
          for(let i = 0 ; i < Content.length ; i ++) {
            let item = Content[i];

            if(item.value || item.desc) {
              break;
            }

            if(i == Content.length - 1) {
              app.showToast('内容不能都为空',2);
              isPass = false;
            }
          }
          break;      
      }
      
      if(!isPass) break;
    }
    

    return isPass;
  },

  //导航栏返回跳转
  headerClick(e) {
    app.headerClick(e);
  }
})