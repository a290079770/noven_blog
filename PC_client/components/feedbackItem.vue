<template>
  <section class="flex feedback-item">
    <figure class="feedback-item-cover bg-full-img" :style="{background: 'url('+ item.CoverUrl +')'}" ></figure>
    <section class="feedback-item-content">
      <h3>{{item.NickName}}</h3>
      <p class="gray6 font feedback-item-content-list" v-html="item.Content"></p>

      <p class="gray9 font-xs">
        <span>{{item.CreateTime}}</span>
        <span class="primary font feedback-back">回复</span>
      </p>


      <section class="feedback-reply-list">
        <section v-for="(item,index) in item.Children" class="flex feedback-reply-item">
          <figure class="feedback-item-cover bg-full-img" :style="{background: 'url('+ item.CoverUrl +')'}" ></figure>
          <section class="feedback-item-content feedback-item-reply-content">
            <h3>{{item.NickName}}</h3>
            <p class="gray6 font feedback-item-content-list" v-html="item.Content"></p>

            <p class="gray9 font-xs">
              <span>{{item.CreateTime}}</span>
              <span class="primary font feedback-back">回复</span>
            </p>
          </section>
        </section>
      </section>

      <section v-if="true" class="feedback-reply-textarea">
        <p>
          <textarea 
          v-if="true" 
          class="font gray6 feedback-reply-input"
          :placeholder="`回复@`" 
          ></textarea>
        </p>
        <p class="flex flex-align-center feedback-item-edit-btns">
          <el-button size="mini" @click="" type="primary">回复</el-button>
          <el-button size="mini" @click="">清空</el-button>
        </p>
      </section>
    </section>
  </section>
</template>

<script>

export default {
  props:{
    item: {
      type:Object,
    }
  },
  data() {
    return {
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
  @import '~assets/style/varite.less';
  
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
      border: @borderDashed;

      &:hover {
        border-radius: 8px;
      }
    }

    .feedback-item-content {
      width: 980px;
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

    .feedback-reply-textarea {
      margin-top: 20px;

      .feedback-reply-input {
        transition: @transition;
        padding: 10px 12px;
        width: 100%;
        height: 100px;
        border: @borderBold;
        outline: none;
        border-radius: 4px;
      }

      .feedback-item-edit-btns {
        margin-top: 10px;
      }
    }
  }
</style>