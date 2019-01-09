<template>
  <section class="my-list">
    <div 
    class="flex-center my-list-item" 
    v-for="(item,index) in dataList" 
    >
      <div 
      @touchstart="itemTouchStart(item)"
      @touchend="itemTouchEnd(item.Id)" 
      class="flex flex-align-center flex-justify-between my-list-item-cont"
      >
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
      total: 0,
      cp: 1,
      ps: 10,
      timer: null, //长按定时器
      touchTime:null, //记录点击时的时间戳
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
      let { ps , cp } = this;

      let { list, recordCount } = await getArticleList(ps,cp,'','CreateTime');
      this.dataList = cp > 1 ? [...this.dataList, ...list] : list;
      this.total = recordCount;
    },

    async itemTouchStart(item) {
      this.touchTime = Date.now();
      //开始计时
      await new Promise(resolve => this.timer = setTimeout(resolve,500))

      this.isOpenEdit = true;

    },

    itemTouchEnd(id) {
      clearTimeout(this.timer);

      if(this.isOpenEdit) {

      }else {
        if(Date.now() - this.touchTime < 500) this.handleArticleClick(id);
      }
    },

    handleArticleClick(id) {
      this.goTo('/detail',`id=${id}`)
    },
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
