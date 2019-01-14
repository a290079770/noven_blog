<template>
  <section class="updateinfo-cont">
    <div class="flex updateinfo-nickname" v-if="type == 3"> 
      <input 
      ref="nickNameInput"
      v-model="editUserInfo.NickName"
      type='text' 
      class="flex-1 updateinfo-nickname-input"
      placeholder="请输入您的昵称！" 
      autofocus
      @input="inputAction($event)"
      />
    </div>

    <div class="updateinfo-abstract" v-if="type == 4">
       <textarea 
       ref="introInput"
       class="updateinfo-nickname-textarea"
       autofocus
       placeholder="请输入您的简介！"
       v-model="editUserInfo.Introduction"
       @input="inputAction($event)"
       >
       </textarea>
    </div>


    <div class="flex flex-align-center flex-justify-between updateinfo-notice">
      <span> 您最多可以输入<span class="updateinfo-notice-hasinput">{{ type == 3 ? nickNameLen : briefLen}}</span>个字符 </span>    
      <span> <span class="updateinfo-notice-hasinput"> {{ currentLen }} </span>     / {{ type == 3 ? nickNameLen : briefLen}}</span>     
    </div>
    <div>
      <Button type="info" customClass="update-my-submit" @click="updateAction">
        提交修改
      </Button>  
    </div>
  </section>
</template>

<script>
import Button from '~/components/Button';
import { updateUserInfo } from '~/assets/service/userService'
export default {
  async asyncData ({ app , redirect}) {
    //拦截非管理员用户
    let isAuth = await app.validUserInfo();
    if(!isAuth) redirect('/');
  },
  data() {
    return {
      type:4,  //3 - 修改昵称。 4 - 修改简介
      nickNameLen:12,
      briefLen: 280,
      currentLen:0,
      editUserInfo: {
        NickName:'',
        Introduction: ''
      },
    }
  },

  components:{
    Button
  },


  methods:{
   updateAction(type) {
    console.log(11)
      //发起修改
      //数据验证，这里只需要验证nickName
      let { NickName,Introduction } = this.editUserInfo;
      
      if(!NickName || !NickName.replace(/ /g,'')) {
        this.$message('昵称不能为空');
        return;
      }

      if(/[^A-Za-z0-9\u4e00-\u9fa5]/.test(NickName)) {
        this.$message('昵称不能有特殊字符');
        return;
      }

      if(!Introduction || !Introduction.replace(/ /g,'')) {
        this.$message('个人简介不能为空');
        return;
      }

      this.updateUserInfo();
    },

    //修改用户信息
    async updateUserInfo() {
      this.userInfo = await updateUserInfo(this.editUserInfo);

      this.$message('修改用户信息成功！');
      this.$nextTick(async function() {
        localStorage.setItem('userInfo',JSON.stringify(this.userInfo));
        await new Promise(res => setTimeout(res,1000));

        this.$router.go(-1);
      })
    },
    /**
   * [inputAction 输入事件]
   * @Author   罗文
   * @DateTime 2018-09-30
   * @return   {[type]}   [description]
   */
   inputAction(event) {
      let value = event.target.value;

      //type 3 - 昵称输入    4 - 简介
      const { nickNameLen = 12, briefLen = 280, type } = this;
      //获取当前长度
      const computedLen = this.getLen(value);

      //最后处理之后的长度
      let lastLen = computedLen; 

      if( type == 3 ) {
        if( computedLen > nickNameLen ) {
          this.editUserInfo.NickName = this.getSliceStr(value,nickNameLen)
          lastLen = nickNameLen;
        }else {
          this.editUserInfo.NickName = value
        }
      }else if( type == 4 ) {
        if( computedLen > briefLen ) {
          this.editUserInfo.Introduction = this.getSliceStr(value,briefLen)
          lastLen = briefLen;
        }else {
          this.editUserInfo.Introduction = value
        }
      }

      this.currentLen = lastLen;
    },
  },
  created() {
    this.type = this.$route.query.type;
    //获取用户信息,如果有就显示
    try {
      let { NickName , Introduction } = JSON.parse(localStorage.userInfo);
      this.editUserInfo = { NickName , Introduction };
      this.currentLen = this.type == 3 ? this.getLen(NickName) : this.getLen(Introduction);
    }catch(e) {
      //没有用户信息的话用默认的
    }
  },
  mounted() {
    this.type == 3 ? this.$refs.nickNameInput.select() : this.$refs.introInput.select()
  },
}
</script>
