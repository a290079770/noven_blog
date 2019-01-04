<template>
   <button :class="buttonClass + ' ' + customClass" @click="nativeClick($event)">
     <slot/>
   </button>
</template>
<script>
export default {
  props:{
    type:{
      type:String,
      default:'',
    },
    plain:{
      type:Boolean,
      default:false,
    },
    disabled:{
      type:Boolean,
      default:false,
    },
    customClass:{
      type:String,
      default:'',
    },

  },
  data() {
    return {
       buttonClass:'',
    }
  },
  methods:{
    //将点击事件传输出去
    nativeClick(e) {
      if(this.disabled) return;

      this.$emit('click',e);
    }
  },
  created() {
    this.buttonClass = 'button-'+this.type;
    //如果是空心，则用空心的class
    if(this.plain) this.buttonClass += '-plain';
    
    //如果是禁用
    if(this.disabled) this.buttonClass += ' disabled';
  },

  watch:{

  }
}

</script>

<style lang="less" scoped>
  @import '~assets/style/varite.less';

  button {
    box-sizing: border-box;
    outline: none;
    font-size: 0.28rem;
    border-radius: 0.1rem;
  }

  //primary

  .button-primary {
    background: @primary;
    border: none;
    color: white;
  }
  .button-primary:active {
    background: #cc0000;
  }


  //primary-plain
  .button-primary-plain {
    background: transparent;
    border: 1px solid @primary;
    color: #222;
  }

  .button-primary-plain:active {
    border: 1px solid #cc0000;
  }



  //warning
  .button-warning {
    background: @warning;
    border: none;
    color: white;
  }
  .button-warning:active {
    background: #f5af18;
  }


  //warning-plain
  .button-warning-plain {
    background: transparent;
    border: 1px solid @warning;
    color: #222;
  }

  .button-warning-plain:active {
    border: 1px solid #f5af18;
  }



  //danger
  .button-danger {
    background: #ff5d60;
    border: none;
    color: white;
  }
  .button-danger:active {
    background: #f5585b;
  }


  //danger-plain
  .button-danger-plain {
    background: transparent;
    border: 1px solid #ff5d60;
    color: #222;
  }

  .button-danger-plain:active {
    border: 1px solid #f5585b;
  }


  //info
  .button-info {
    background: @info;
    border: none;
    color: white;
  }
  .button-info:active {
    background: @info;
  }


  //info-plain
  .button-info-plain {
    background: transparent;
    border: 1px solid @info;
    color: #222;
  }

  .button-info-plain:active {
    border: 1px solid @info;
  }


   //sucess
  .button-success {
    background: #10d0b8;
    border: none;
    color: white;
  }
  .button-success:active {
    background: #10c7b2;
  }


  //success-plain
  .button-success-plain {
    background: transparent;
    border: 1px solid #10d0b8;
    color: #222;
  }

  .button-success-plain:active {
    border: 1px solid #10c7b2;
  }


  .disabled {
    opacity: 0.4;
  }




</style>
