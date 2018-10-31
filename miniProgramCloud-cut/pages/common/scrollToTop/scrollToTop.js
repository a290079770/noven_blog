var app = getApp();

Component({

  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    hidden:{
      type:Boolean,
      value: true
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    addArticleAction() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 500
      })

      this.triggerEvent('handleClick');
    }
  },
})