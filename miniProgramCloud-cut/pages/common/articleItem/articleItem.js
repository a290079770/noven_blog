
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    item:{
      type:Object,   //目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value:{}
    },
    isBorderBottomShow:{
      type:Boolean,
      value:true,
      observer: function (newVal, oldVal) { 
        //数据变化时执行的操作
      }
    },
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    defaultUrl:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */
    handleClick(e) {
      this.triggerEvent('handleClick');
    }
  },
})