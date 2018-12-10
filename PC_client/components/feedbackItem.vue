<template>
  <section class="flex feedback-item">
    <figure class="feedback-item-cover bg-full-img" :style="{background: 'url('+ item.CoverUrl +')'}" ></figure>
    <section class="feedback-item-content">
      <h3>{{item.NickName}}</h3>
      <p class="gray6 font feedback-item-content-list" v-html="item.Content"></p>

      <p class="gray9 font-xs">
        <span>{{item.CreateTime}}</span>
        <span class="primary font feedback-back" @click="showReply(item.NickName)">回复</span>
      </p>


      <section class="feedback-reply-list">
        <section v-for="(citem,cindex) in item.Children" class="flex feedback-reply-item">
          <figure class="feedback-item-cover bg-full-img" :style="{background: 'url('+ citem.CoverUrl +')'}" ></figure>
          <section class="feedback-item-content feedback-item-reply-content">
            <h3>{{citem.NickName}}</h3>
            <p class="gray6 font feedback-item-content-list" v-html="`@回复<span class='info'>${citem.ReplyNickName || ''}</span>：${citem.Content}` "></p>

            <p class="gray9 font-xs">
              <span>{{citem.CreateTime}}</span>
              <span class="primary font feedback-back" @click="showReply(citem.NickName)">回复</span>
            </p>
          </section>
        </section>
      </section>

      <section v-if="item.isReplyShow" class="feedback-reply-textarea">
        <p>
          <textarea 
          class="font gray6 feedback-reply-input"
          :placeholder="`回复@${item.replyNickName}`"
          v-model="item.replyText" 
          ></textarea>
        </p>
        <p class="flex flex-align-center feedback-item-edit-btns">
          <el-button size="mini" type="primary" @click="replyAction">回复</el-button>
          <el-button size="mini" @click="clearReplyText">清空</el-button>
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

  methods:{
    //触发回复框显示
    showReply(nickName) {
      this.$emit('showReply',nickName);
    },

    //点击清空按钮
    clearReplyText() {
      this.$emit('clearReplyText');
    },

    //发起回复操作
    replyAction() {
      this.$emit('replyAction');
    }
  },
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