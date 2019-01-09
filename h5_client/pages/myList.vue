<template>
  <section class="my-list">
    <div 
    class="flex-center my-list-item" 
    v-for="(item,index) in dataList" 
    @click="handleArticleClick" 
    >
      <div class="flex flex-align-center flex-justify-between my-list-item-cont">
         <div class="flex flex-align-center my-list-item-cont-left">
           <div v-if="isOpenEdit" class="flex flex-align-center my-list-item-del">
             <div class="my-list-item-del-kong" v-if="!item.selected"></div>
             <img v-else :src="'/gou.svg'" class="my-list-item-del-icon">
           </div>
           <div class="flex flex-justify-around my-list-arc" :style="{width:`${isOpenEdit ? 4 : 4.6 }rem`}">
             <div class="text-ess-2 my-list-arc-title">
              {{item.Title}}
             </div>
             <div class="text-ess-1 my-list-arc-date">
              {{item.CreateTime}}
             </div>
           </div>
         </div>
         <div class="my-list-arc-cover-cont bg-full-img" :style="{background: `url(${ item.Url })`}">
         </div>
      </div> 
    </div>

    
    <div class="my-list-edit-btns">
      <div class="flex-center font-lg my-list-edit-btn my-list-edit-all" :class="{ 'my-list-edit-all-active' : isOpenEdit }" @click="selectAll">
        全选
      </div>
      <div class="flex-center font-lg my-list-edit-btn my-list-edit-del" :class="{ 'my-list-edit-del-active' : isOpenEdit }" @click="deleteAction">
        删除
      </div>
      <div class="flex-center font-lg my-list-edit-btn my-list-edit-cancel" :class="{ 'my-list-edit-cancel-active' : isOpenEdit }" @click="cancel">
        取消
      </div>
    </div>
  </section>
</template>

<script>
import { getArticleList } from '~/assets/service/articleService'
import ArticleListItem from '~/components/articleListItem'
export default {
  data() {
    return {
      dataList:[],
      isOpenEdit: false,
    }
  },

  components:{
    'article-list-item':ArticleListItem
  },

  methods:{
    /**
     * [getArticleList 获取文章列表]
     * @param  {[StriNg]} listName [对应this.data里的三个列表]
     * @return {[type]}          [description]
     */
    async getArticleList(listName) {
      let orderBy = [
          {
            listName:'dataList',
            order:'CreateTime',
            ps:10
          }
      ];

      let { order , ps } = orderBy.find(item => item.listName == listName);
      let { list } = await getArticleList(ps,1,'',order);
      this.dataList = list;
    },

    handleArticleClick() {},
    selectAll() {},
    deleteAction() {},
    cancel() {},
  },
  computed:{
    isLogin() {
      try {
        return JSON.parse(localStorage.userInfo);
      }catch(e) {
        //没有用户信息的话用默认的
        return false;
      }
    }
  },
  created() {
    this.getArticleList('dataList');
  },
  mounted() {

  },
}
</script>
