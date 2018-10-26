<template>
  <div class="mine-wrap">
    <div class="title">个人中心</div>
    <div class="userinfo">
      <img src="http://temp.im/50x50" alt="">
      <span class="nickname">昵称</span>
    </div>
    <!-- 我的发布、我的收藏 -->
    <div class="tongji flex">
      <div class="publish flex">
        <img src="http://temp.im/30x100" alt="">
        <span class="publish-count flex">
          <span>0</span>
          <span>我的发布</span>
        </span>
      </div>
      <div class="collect flex">
        <img src="http://temp.im/30x100" alt="">
        <span class="collect-count flex">
          <span>10</span>
          <span>我的收藏</span>
        </span>
      </div>
    </div>
    <div class="list-wrap">
      <div class="list-item flex">
        <img src="http://temp.im/25x25">
        <span class="list-item-text">修改头像</span>
      </div>
      <div class="list-item flex">
        <img src="http://temp.im/25x25">
        <span class="list-item-text">修改昵称</span>
      </div>
      <div class="list-item flex">
        <img src="http://temp.im/25x25">
        <span class="list-item-text">修改简介</span>
      </div>
      <div class="list-item flex">
        <img src="http://temp.im/25x25">
        <span class="list-item-text">关于我们</span>
      </div>
      <div class="list-item flex">
        <img src="http://temp.im/25x25">
        <span class="list-item-text">意见反馈</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {
      
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
  .flex {
    display: flex;
  }
  .mine-wrap {
    padding: 0 .2rem;
    .title {
      text-align: center;
      margin-bottom: .2rem;
    }
    .userinfo {
      padding: .2rem 0;
      display: flex;
      align-items: center;
      /*border-bottom: 1px solid #ddd;*/
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
      .nickname {
        margin-left: .2rem;
      }
    }
    .tongji {
      margin-top: .2rem;
      justify-content: space-between;
      color: rgb(107, 42, 42);
      font-size: .14rem;
      .publish, .collect {
        justify-content: space-around;
        width: 1.6rem;
        height: 1rem;
        background: rgba(221, 144, 157, 0.2);
        img {
          width: .3rem;
          height: 1rem;
        }
      }
      .publish-count, .collect-count {
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
    .list-wrap {
      margin-top: .3rem;
      .list-item {
        align-items: center;
        height: .4rem;
        img {
          width: .25rem;
          height: .25rem;
        }
        .list-item-text {
          margin-left: .1rem;
          font-size: .14rem;
        }
      }
    }
  }
	
</style>
