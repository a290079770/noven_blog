<template>
  <section class="mc my">
    <section class="flex flex-column flex-align-center pr my-cont">
      <section class="flex flex-align-center flex-justify-end my-edit-cont">
        <img @click="isEdit = true" class="edit-icon" src="~assets/icon/write.svg" v-if="!isEdit">
        <img @click="isEdit = false" class="edit-icon edit-icon-close" src="~assets/icon/close.svg" v-if="isEdit">
        <img @click="isEdit = false" class="edit-icon" src="~assets/icon/ok.svg" v-if="isEdit">
      </section>

      <figure class="my-cover">
        <img src="https://img08.lechebangstatic.com/share/minapp/newCar/photo_3.jpg" class="full-img">
      </figure>

      <el-upload
        v-if="isEdit"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <div class="flex-center my-cover-upload" :style="{background: 'url(https://img08.lechebangstatic.com/share/minapp/newCar/photo_3.jpg) no-repeat center', backgroundSize:'cover' }">
          <img class="my-cover-upload-icon" src="~assets/icon/add-gray.svg">
        </div>
      </el-upload>

      <h2 class="flex flex-column flex-align-center primary my-name">
        Noven
        <p v-if="isEdit">
          <input 
          maxlength="12" 
          class="my-name-input" 
          type="text" 
          v-model="nickName"
          >
        </p>
      </h2>

      <p class="font gray9 my-abs">
        这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介

        <textarea 
        v-if="isEdit" 
        maxlength="280" 
        class="font gray6 my-abs-input"
        ></textarea>
      </p>

      <p class="my-arc-title">
        我的文章
      </p>

      <table  class="my-arc-table">
        <thead>
          <tr class="font-lg">
            <th width="150">
              <img class="my-check-icon" src="~assets/icon/check.svg">
            </th>
            <th width="600">标题</th>
            <th width="150">创建时间</th>
            <th>编辑</th>
          </tr>
        </thead>
        <tbody>
          <tr class="font">
            <td>
              <img class="my-check-icon" src="~assets/icon/checked.svg">
            </td>
            <td class="my-arc-item-title">一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这</td>
            <td>2018-11-29 16:35</td>
            <td>
              <button class="my-table-btn">编辑</button>
              <button class="my-table-btn my-table-btn-del">删除</button>
            </td>
          </tr>

          <tr class="font">
            <td>
              <img class="my-check-icon" src="~assets/icon/checked.svg">
            </td>
            <td class="my-arc-item-title">一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这</td>
            <td>2018-11-29 16:35</td>
            <td>
              <button class="my-table-btn ">编辑</button>
              <button class=" my-table-btn my-table-btn-del">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <section class="flex flex-justify-end my-page">
        <el-pagination
          @size-change="handleSizeChange"
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
      <img @click="" class="add-article" src="~assets/icon/add.svg">
    </section>

    <section class="flex-center add-article-cont my-timeline">
      <img @click="$router.push('/timeline')" class="add-article" src="~assets/icon/timeline.svg">
    </section>
  </section>
</template>

<script>

export default {
  data() {
    return {
      isEdit: false,
      cp: 1,
      ps: 10,
      total: 100,
      nickName:''
    }
  },

  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },

  mounted() {
     console.log(111)
  }
}
</script>

<style scoped lang="less">

</style>
