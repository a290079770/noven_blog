const app = getApp();

Component({
  properties: {
    data: {
      type: Object,
      default: {}
    }
  },
  data: {
    
  },
  attached: function () {
    // console.log(this.properties.data)
  },
  methods: {
    toDetails: function () {

      app.toDetails(this.properties.data.Id);
      
      // wx.navigateTo({
      //   url: "/pages/details/details?id=" + this.properties.data.id
      // })
    }
  }
  
})
