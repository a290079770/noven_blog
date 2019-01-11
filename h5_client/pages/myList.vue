<template>
  <section >
    <section v-if="dataList.length" class="my-list">
      <div 
      class="flex-center my-list-item" 
      v-for="(item,index) in dataList" 
      >
        <div 
        @click="handleArticleClick(index,item.Id)"
        class="flex flex-align-center flex-justify-between my-list-item-cont"
        >
           <div class="flex flex-align-center my-list-item-cont-left">
             <div v-if="isOpenEdit" class="flex flex-align-center my-list-item-del">
               <div class="my-list-item-del-kong" v-if="!item.selected"></div>
               <img v-else src="/gou.svg" class="my-list-item-del-icon">
             </div>
             <div 
             class="flex flex-justify-around my-list-arc" 
             :style="{width:`${isOpenEdit ? 4 : 4.6 }rem`}"
             >
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

        <div v-if="!isOpenEdit" class="flex-center font-lg my-list-edit-btn my-list-edit-btn my-list-edit-cancel-active" @click="isOpenEdit = true">
          <img class="my-list-edit-btn-icon" src="~assets/icon/edit.svg">
        </div>
      </div>
    </section>

    <div class="flex-center font gray9" style="min-height: 8rem" v-else>
      {{ type == 1 ? '还没有发布过文章!~' : '还没有收藏过文章!~'}}
    </div>
  </section>
</template>

<script>
import { getArticleList , getCollectList, deleteArticle ,collect } from '~/assets/service/articleService'
import ArticleListItem from '~/components/articleListItem'
export default {
  data() {
    return {
      dataList:[],
      isOpenEdit: false,
      total: 0,
      cp: 1,
      ps: 6,
      timer: null, //长按定时器
      touchTime:null, //记录点击时的时间戳
      type:1,
    }
  },

  components:{
    'article-list-item':ArticleListItem
  },

  methods:{
    /**
     * [getArticleList 获取文章列表]
     * @return {[type]}          [description]
     */
    async getArticleList() {
      let { ps , cp , type } = this;

      let { list, recordCount } = type == 1 ? await getArticleList(ps,cp,'','CreateTime',true) : await getCollectList(ps,cp);

      list.map(item => {
        item.selected = false
        return item;
      });

      this.dataList = cp > 1 ? [...this.dataList, ...list] : list;

      this.total = recordCount;

    },

    handleArticleClick(index,id) {
      if(this.isOpenEdit) {
        let { selected } = this.dataList[index];
        this.$set(this.dataList[index],'selected', !selected);
      }else {
        this.goTo('/detail',`id=${id}`)
      }
    },
    selectAll() {
      this.dataList = this.dataList.map(item => {
        item.selected = true
        return item;
      });
    },
    //删除选中的文章
    deleteAction() {
      let { type } = this;
      let text = `确定${ type == 1 ? '删除选中的文章': '取消选中的收藏'}?`;

    
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //收集选中的id集合
        let filters = this.dataList.filter( item => item.selected);

        if(type == 1) {
          //删除自己发布的文章及相关的收藏评论等数据
          let ids = filters.map(item => item.Id).join(',');
          return deleteArticle({ Ids: ids });
        }else if(type == 2) {
          //取消选中的收藏
          //目前只支持单个取消收藏
          let tasks = [];
          filters.forEach(item => tasks.push(collect({ id:item.Id, isCollect:false })))
          return Promise.all(tasks);
        }
      }).then(() => {
        this.$message('操作成功！');
        this.isOpenEdit = false;
        this.cp = 1;
        this.getArticleList();
      })
    },
    cancel() {
      this.isOpenEdit = false;
      this.dataList = this.dataList.map(item => {
        item.selected = false
        return item;
      });
    },
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
    this.type = this.$route.query.type;
    this.getArticleList('dataList');
  },
  mounted() {
    this.onReachBottom(()=>{
      let { ps, cp , total } = this;
      //cp > 1则是请求加载更多，cp = 1 则是首次加载
      if( cp > 1 && ps * cp >= total ) return; 
      this.cp ++;
      this.getArticleList();
    })

  },
  beforeDestroy() {
    window.onscroll = null;
  }
}
</script>
