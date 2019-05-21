<template>
  <input class="n-input" v-model="value" @input="$emit('change',$event.target.value)">
</template>

<script>
export default {
	model: {
		prop: 'model',
		event: 'change'
	},
	props: ['model'],
  data () {
    return {
      
    }
  },
  
  watch: {
  	model: {
  		handler(nv) {
  			this.value = nv;
  		},
  		immediate: true
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .n-input {
  	width:  2rem;
  	border: 1px solid red;
  }
</style>
