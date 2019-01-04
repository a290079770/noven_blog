<template>
  <section class="updateinfo-cont">
    <div class="flex updateinfo-nickname" v-if="type == 3"> 
      <input 
      type='text' 
      class="flex-1 updateinfo-nickname-input"
      placeholder="请输入您的昵称！" 
      autofocus
      />
    </div>

    <div class="updateinfo-abstract" v-if="type == 4">
       <textarea 
       class="updateinfo-nickname-textarea"
       autofocus
       placeholder="请输入您的简介！"
       >
       </textarea>
    </div>


    <div class="flex flex-align-center flex-justify-between updateinfo-notice">
      <span> 您最多可以输入<span class="updateinfo-notice-hasinput">{{ type == 3 ? nickNameLen : briefLen}}</span>个字符 </span>    
      <span> <span class="updateinfo-notice-hasinput"> {{ currentLen }} </span>     / {{ type == 3 ? nickNameLen : briefLen}}</span>     
    </div>
    <div>
      <Button type="info" customClass="update-my-submit" bindtap="updateAction">
        提交修改
      </Button>  
    </div>
  </section>
</template>

<script>
import Button from '~/components/Button';
export default {
  data() {
    return {
      type:4,  //3 - 修改昵称。 4 - 修改简介
      nickName: '',
      nickNameLen:12,
      brief:'',
      briefLen: 280,
      currentLen:0,
    }
  },

  components:{
    Button
  },


  methods:{},
  created() {
    
  },
  mounted() {
    
  },
}
</script>
