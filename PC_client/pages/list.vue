<template>
  <section class="mc index list">
    <section class="flex flex-justify-between index-body">
      <section class="index-list"> 
        <article-list-item v-for="(item,index) in 5" :key="index"/>

        
        <section class="flex flex-justify-end list-page">
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

      <section class="index-intros">
        <intro-container>
          <div class="index-bloger-cont index-bloger-arcs font gray6">
            <p class="text-ess-1 index-bloger-arc" v-for="(item,index) in 10" :key="index">意义的事总在义的事总在思考一件有意义的事意义的事总在义的事总在思考一件有意义的事</p>
          </div>
        </intro-container>

        <intro-container>
          <div class="index-bloger-cont index-bloger-arcs font gray6">
            <p class="text-ess-1 index-bloger-arc" v-for="(item,index) in 10" :key="index">意义的事总在义的事总在思考一件有意义的事意义的事总在义的事总在思考一件有意义的事</p>
          </div>
        </intro-container>
      </section>
    </section>
  </section>
</template>

<script>
import introContainer from '~/components/introContainer'
import articleListItem from '~/components/articleListItem'
export default {
  data() {
    return {
      cp: 1,
      ps: 10,
      total: 100
    }
  },
  components:{
    'intro-container':introContainer,
    'article-list-item':articleListItem,
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
