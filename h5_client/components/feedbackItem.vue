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
          <Button type="primary" customClass="feedback-item-edit-btn" bindtap="replyAction">
            回复
          </Button> 
          <span class="gray9">
            清空
          </span>
        </p>
      </section>
    </section>
  </section>
</template>

<script>
import Button from '~/components/Button';
export default {
  props:{
    item: {
      type:Object,
    }
  },
  components:{
    Button
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
    padding: .20rem 0;
    border-bottom: @borderBold;
    background: white;
    word-break: break-all;

    .feedback-item-cover {
      transition: @transition;
      margin-right: .14rem;
      width: .54rem;
      height: .54rem;
      border-radius: 50%;
      border: @borderDashed;

      &:hover {
        border-radius: .08rem;
      }
    }

    .feedback-item-content {
      width: 5.85rem;
    }


    .feedback-item-content-list {
      margin: .05rem 0 .10rem;
      min-height: .40rem;
      line-height: .40rem;
    }

    .feedback-back {
      margin-left: .05rem;
      cursor: pointer;
    }


    .feedback-reply-list {
      margin-top: .20rem;
      /*width: 10.40rem;*/

      .feedback-reply-item {
        padding: .15rem .20rem;
        margin-bottom: .08rem;
        background: #F7F7F9;

        .feedback-item-reply-content {
          width: 4.8rem;
        }
      }
    }

    .feedback-reply-textarea {
      margin-top: .20rem;

      .feedback-reply-input {
        transition: @transition;
        padding: .10rem .12rem;
        width: 100%;
        height: 1rem;
        border: @borderBold;
        outline: none;
        border-radius: .04rem;
      }

      .feedback-item-edit-btns {
        margin-top: .10rem;
        font-size: 0.24rem;

        .feedback-item-edit-btn {
          margin-right: 0.15rem;
          border-radius: 0.06rem;
          padding: 0.02rem 0.12rem;
          font-size: 0.24rem;
        }
      }
    }
  }
</style>