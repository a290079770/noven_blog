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
      app.toDetails(this.properties.item.Id, this.properties.item.AppCode);
    }
  },

  attached() {
    // console.log(this.properties.item)
  }
})
