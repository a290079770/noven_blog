// const app = getApp();
// pages/component/toTopBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: {
      type: Boolean,
      default: false
    }
  },
  // properties:  ['hidden'],

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toTop() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 500
      })
    }
  }
})
