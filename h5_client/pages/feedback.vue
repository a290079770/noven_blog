<template>
  <section class="mc index">
    feedback
  </section>
</template>

<script>
import { getArticleList } from '~/assets/service/articleService'
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      
    }
  },

  methods:{
    a() {
      Toast('hellow')
    },
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
          },
          {
            listName:'bannerList',
            order:'ReadCount',
            ps:5
          },
          {
            listName:'recommendList',
            order:'CollectCount',
            ps:10
          },
      ];

      let { order , ps } = orderBy.find(item => item.listName == listName);
      let { list } = await getArticleList(ps,1,'',order);
      this[listName] = list;
    }
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
    //获取用户信息,如果有就显示
    try {
      this.userInfo = JSON.parse(localStorage.userInfo);
    }catch(e) {
      //没有用户信息的话用默认的
    }

    this.getArticleList('dataList');
    this.getArticleList('bannerList');
    this.getArticleList('recommendList');
  },
  mounted() {
    
  },
}
</script>
