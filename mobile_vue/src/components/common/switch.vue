<template>
 <div @click="change">
   <span :class="value ? 'active': 'default'">true</span>
   <span :class="!value ? 'active': 'default'">false</span>
 </div>
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
      value: false,
    }
  },
  methods: {
    change() {
      this.value = !this.value;
      this.$emit('change',this.value);
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

  .default {
    color: #999;
  }

  .active {
    color: #fa5a4b;
  }
</style>
