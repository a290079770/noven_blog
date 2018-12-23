const app = getApp();
Component({
  properties: {
    item:{
      type:Object,
      default:{}
    }
  },
  data: {
    
  },
  methods: {
    toDetail() {
      app.toDetails(this.properties.item.Id)
    }
  },

  attached() {
    // console.log(this.properties.item)
  }
})
