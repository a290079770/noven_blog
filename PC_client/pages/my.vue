<template>
  <section class="mc my">
    <section class="flex flex-column flex-align-center pr my-cont">
      <section class="flex flex-align-center flex-justify-end my-edit-cont">
        <img @click="isEdit = true" class="edit-icon" src="~assets/icon/write.svg" v-if="!isEdit">
        <img @click="toggleEdit(2)" class="edit-icon edit-icon-close" src="~assets/icon/close.svg" v-if="isEdit">
        <img @click="toggleEdit(1)" class="edit-icon" src="~assets/icon/ok.svg" v-if="isEdit">
      </section>

      <figure @click="isEdit = true" class="my-cover bg-full-img " :style="{background: `url(${userInfo.CoverUrl})`}"></figure>
      <el-upload
        v-if="isEdit"
        :action="uploadParams.action"
        :multiple="uploadParams.multiple"
        :name="uploadParams.name"
        :accept="uploadParams.accept"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        >
        <div class="flex-center my-cover-upload bg-full-img " :style="{background: `url(${editUserInfo.CoverUrl})`}">
          <img class="my-cover-upload-icon" src="~assets/icon/add-gray.svg">
        </div>
      </el-upload>

      <h2 class="flex flex-column flex-align-center primary my-name">
        {{userInfo.NickName}}
        <p v-if="isEdit">
          <input 
          maxlength="12" 
          class="my-name-input" 
          type="text" 
          placeholder="请输入要修改的昵称" 
          v-model="editUserInfo.NickName"
          >
        </p>
      </h2>

      <p class="font gray9 my-abs">
        {{userInfo.Introduction || '我才懒得写简介~~~'}}

        <textarea 
        v-if="isEdit" 
        maxlength="280" 
        class="font gray6 my-abs-input"
        placeholder="请输入要修改的简介" 
        v-model="editUserInfo.Introduction"
        ></textarea>
      </p>

      <p class="my-arc-title">
        我的文章
      </p>

      <table  class="my-arc-table">
        <thead>
          <tr class="font-lg">
            <th width="150">
              <img @click="selectAll" class="my-check-icon" :src=" selectedAll ? '/checked.svg' :'/check.svg'">
            </th>
            <th width="600">标题</th>
            <th width="150">创建时间</th>
            <th>编辑</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in dataList" class="font">
            <td>
              <img @click="selectItem(index)" class="my-check-icon" :src=" item.selected ? '/checked.svg' :'/check.svg'">
            </td>
            <td class="my-arc-item-title">{{item.Title}}</td>
            <td>{{item.CreateTime}}</td>
            <td>
              <button @click="goTo('/addArticle',`id=${item.Id}`)" class="my-table-btn">编辑</button>
              <button @click="deleteArc(item.Id)" class="my-table-btn my-table-btn-del">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <section v-if="isDelAllShow" class="my-del-all">
        <el-button size="small" @click="deleteSelected">删除选中</el-button>
      </section>

      <section class="flex flex-justify-end my-page">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="cp"
          :page-size="ps"
          layout="pager"
          :total="total"
          :background="true"
          >
        </el-pagination>
      </section> 
    </section>

    <section class="flex-center add-article-cont">
      <img @click="$router.push('/addArticle')" class="add-article" src="~assets/icon/add.svg">
    </section>

    <section class="flex-center add-article-cont my-timeline">
      <img @click="$router.push('/timeline')" class="add-article" src="~assets/icon/timeline.svg">
    </section>
  </section>
</template>

<script>
import { getArticleList , deleteArticle } from '~/assets/service/articleService'
import { updateUserInfo } from '~/assets/service/userService'
export default {
  //拦截非管理员用户
  async asyncData ({ app, redirect }) {
    let isAuth = await app.validUserInfo();
    if(!isAuth) redirect('/');
  },
  data() {
    return {
      dataList:[],
      isEdit: false,
      cp: 1,
      ps: 10,
      total: 0,
      userInfo: {},
      editUserInfo: {
        NickName:'',
        CoverUrl:'',
        Introduction: ''
      },
      uploadParams: this.getUploadParams()
    }
  },

  methods:{
    /**
     * [getArticleList 获取文章列表]
     * @return {[type]}          [description]
     */
    async getArticleList() {
      let { list , recordCount } = await getArticleList(this.ps,this.cp,'','CreateTime',true);

      this.dataList = list.map(item => {
        item.selected = false;
        return item;
      });
      this.total = recordCount;
    },

    /**
     * [toggleEdit 编辑用户信息，点击勾还是叉]
     * @Author   罗文
     * @DateTime 2018-12-06
     * @param    {[Number]}   type [1 - 确定修改 2 - 取消修改]
     * @return   {[type]}        [description]
     */
    toggleEdit(type) {
      if(type == 2) {
        this.resetEditUserInfo();
        return;
      }

      //发起修改
      //数据验证，这里只需要验证nickName
      let { NickName } = this.editUserInfo;
      
      if(!NickName || !NickName.replace(/ /g,'')) {
        this.$message.error('昵称不能为空');
        return;
      }

      if(/[^A-Za-z0-9\u4e00-\u9fa5]/.test(NickName)) {
        this.$message.error('昵称不能有特殊字符');
        return;
      }

      if(this.getLen(NickName) > 12) {
        this.$message.error('昵称不能超过12个字符，一个汉字为2个字符');
        return;
      }

      this.updateUserInfo();
    },

    //修改用户信息
    async updateUserInfo() {
      this.userInfo = await updateUserInfo(this.editUserInfo);

      this.$message.success('修改用户信息成功！');
      this.$nextTick(function() {
        localStorage.setItem('userInfo',JSON.stringify(this.userInfo));
        this.resetEditUserInfo();
      })
    },

    //删除一篇文章
    deleteArc(id) {
      this.$confirm('确定删除该文章及其相关数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteArticle({ Id: id});
      }).then(() => {
        this.$message.success('操作成功！');
        this.getArticleList();
      })
    },

    //删除选中的文章
    deleteSelected() {
      this.$confirm('确定删除选中的文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //收集选中的id集合
        let ids = this.dataList.filter( item => item.selected).map(item => item.Id).join(',');
        return deleteArticle({ Ids: ids });
      }).then(() => {
        this.$message.success('操作成功！');
        this.getArticleList();
      })
    },

    //切换单个选中
    selectItem(index) {
      let { selected } = this.dataList[index];
      this.$set(this.dataList[index],'selected',!selected);
    },
    //切换所有选中
    selectAll() {
      let current = this.selectedAll;
      this.dataList = this.dataList.map(item => {
        item.selected = !current;
        return item;
      })
    },

    //上传成功
    handleAvatarSuccess(res, file) {
      let { code , description , data } = res;
      if( code !== 200) {
        this.$message.error(description);
        return 
      }

      this.$set(this.editUserInfo,'CoverUrl',data.url.replace(/\\/g,'/'));
    },
    //当前页码
    handleCurrentChange(val) {
      this.cp = val;
      this.getArticleList();
    },

    //重置编辑用户信息
    resetEditUserInfo() {
      this.isEdit = false;
      this.editUserInfo = this.pick(this.userInfo,['NickName','CoverUrl','Introduction'])
    }
  },
  computed: {
    selectedAll() {
      return this.dataList.every(item => item.selected);
    },

    isDelAllShow() {
      return this.dataList.some(item => item.selected);
    }
  },
  created() {
    sessionStorage.removeItem('previewArticleData');
    //获取用户信息
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
      this.getArticleList();
      this.resetEditUserInfo();
    }catch(e) {
      this.$confirm('获取用户信息失败！','提示',{
        showCancelButton: false,
      })
      .then(() => {
        this.goTo('/login','',true);
      })
    }
  },
  mounted() {
     
  }
}
</script>

<style scoped lang="less">

</style>
