<template>
  <div class="search-wrap">
    <div class="search-box">
      <mt-search
        v-model="value"
        cancel-text="取消"
        placeholder="搜索"
        autofocus
        >
      </mt-search>
    </div>
    <div class="research-res">
      搜索结果
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      value: '',
      
    }
  },
  components:{
    
  },
  methods:{

  },

  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .search-wrap {
    padding: 0 .2rem;
    .search-box {
      margin-top: .3rem;
      height: .5rem;
      .mint-searchbar {
        padding: 0;
        background: #fff;
        .mint-searchbar-inner {
          height: .2rem;
          border: 1px solid #eee;
        }
      }
      .mint-searchbar-cancel {
        display: inline-block;
        font-size: .14rem;
        color: #666;
      }
    }
  }
	
</style>
