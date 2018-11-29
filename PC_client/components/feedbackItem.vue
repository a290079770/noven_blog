<template>
  <section class="flex feedback-item">
    <figure class="feedback-item-cover" :style="{background: 'url('+ data.cover +') no-repeat center', backgroundSize:'cover' }" ></figure>
    <section class="feedback-item-content">
      <h3>{{data.nickName}}</h3>
      <p class="gray6 font feedback-item-content-list" v-html="data.content"></p>

      <p class="gray9 font-xs">
        <span>{{data.createTime}}</span>
        <span class="primary font feedback-back">回复</span>
      </p>


      <section class="feedback-reply-list">
        <section v-for="(item,index) in data.children" class="flex feedback-reply-item">
          <figure class="feedback-item-cover" :style="{background: 'url('+ item.cover +') no-repeat center', backgroundSize:'cover' }" ></figure>
          <section class="feedback-item-content feedback-item-reply-content">
            <h3>{{item.nickName}}</h3>
            <p class="gray6 font feedback-item-content-list" v-html="item.content"></p>

            <p class="gray9 font-xs">
              <span>{{item.createTime}}</span>
              <span class="primary font feedback-back">回复</span>
            </p>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>

export default {
  data() {
    return {
      data:{
        id:1,
        cover:'https://img08.lechebangstatic.com/share/minapp/newCar/photo_1.jpg',
        nickName:'张三',
        content:'<p style="color: yellow">路过，拉下一坨翔</p><p>大家觉得这翔如何</p><p>大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何大家觉得这翔如何</p><img width="60" src="https://img08.lechebangstatic.com/share/minapp/newCar/photo_3.jpg">',
        createTime:'2018-11-29 15:49:30',
        children:[
          {
            id:2,
            cover:'https://img08.lechebangstatic.com/share/minapp/newCar/photo_2.jpg',
            nickName:'李四',
            content:'<p style="color: yellow">这是一坨有故事的翔</p><p>博主怎么看？</p>',
            createTime:'2018-11-29 15:49:30',
          },
          {
            id:3,
            cover:'https://img08.lechebangstatic.com/share/minapp/newCar/photo_3.jpg',
            nickName:'王二麻子',
            content:'<p style="color: green">此翔甚好～</p><p>此翔甚好～</p><p>此翔甚好～</p><p>此翔甚好～</p><p>此翔甚好～</p><p>此翔甚好～</p><p>此翔甚好～</p><p>此翔甚好～</p>',
            createTime:'2018-11-29 15:49:30',
          },
        ]
      }
    }
  },

  methods:{},
  created() {
    
  },
  mounted() {
    
  }
}
</script>

<style lang="less" scoped>
  @import '~assets/style/common.less';
  
  .feedback-item {
    padding: 20px 30px;
    border-bottom: @borderBold;
    background: white;

    .feedback-item-cover {
      transition: @transition;
      margin-right: 20px;
      width: 48px;
      height: 48px;
      border-radius: 50%;

      &:hover {
        border-radius: 8px;
      }
    }

    .feedback-item-content {
      width: 1040px;
    }


    .feedback-item-content-list {
      margin: 5px 0 10px;
      min-height: 40px;
      line-height: 20px;
    }

    .feedback-back {
      margin-left: 5px;
      cursor: pointer;
    }


    .feedback-reply-list {
      margin-top: 20px;
      width: 1040px;

      .feedback-reply-item {
        padding: 15px 20px;
        margin-bottom: 8px;
        background: #F7F7F9;

        .feedback-item-reply-content {
          width: 900px;
        }
      }
    }
  }
</style>