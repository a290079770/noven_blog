
<script>
export default {
  template:(function() {
    console.log(this)
    return '<span>zzzzz {{msg}}</span>'
  })(),
  data () {
    return {
      testTemplate: '<span>zzzzz{{msg}}</span>',
      msg: 'world'
    }
  },
  created() {
    this.template = '<span>zzzzz{{msg}}</span>'
  }
}
</script>

