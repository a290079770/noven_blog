const app = getApp();
Component({
  // options: {
  //   multipleSlots: true // 在组件定义时的选项中启用多slot支持
  // },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    item:{
      type:Object,   //目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value:{},
      observer: function(newVal) {
         const { Content } = newVal;
         if( !Content ) return;
         let imgList = Content.filter( item => item.type == 'img');
         this.setData({
            imgList:imgList.map( item => item.value ).slice(0,3)
         })
      }
    },
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    imgList:[]
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    previewItemImg({ currentTarget : { dataset:{ index }}}) {
      wx.previewImage({
        current: this.data.imgList[index], // 当前显示图片的http链接
        urls: this.data.imgList // 需要预览的图片http链接列表
      })
    },
    /*
     * 公有方法
     */
    handleClick(e) {
      this.triggerEvent('handleClick');
    }
  }
})