<template>
  <section class="mc index">
    <section> &nbsp; </section>
    <section class="index-swiper">
      <el-carousel 
      :interval="0" 
      height="505px"
      trigger="click"
      >
        <el-carousel-item v-for="(item,index) in bannerList" :key="'banner'+index">
          <section :style="{background: 'url('+ item.Url +') no-repeat center', backgroundSize:'cover' }" class="flex-center index-swiper-item">
            <section class="index-swiper-detail-cont">
              111
            </section>
          </section>
        </el-carousel-item>
      </el-carousel>
    </section>

    <section class="flex flex-justify-between index-body">
      <section class="index-list"> 
        1
      </section>

      <section class="index-intros">
        2
      </section>
    </section>
  </section>
</template>

<script>

export default {
  data() {
    return {
      bannerList:[
        {
          title:'xxx',
          Url:'http://t2.hddhhn.com/uploads/tu/201707/200/10.jpg'
        },
        {
          title:'xxx',
          Url:'http://t2.hddhhn.com/uploads/tu/201707/200/10.jpg'
        },
        {
          title:'xxx',
          Url:'http://t2.hddhhn.com/uploads/tu/201707/200/10.jpg'
        },
        {
          title:'xxx',
          Url:'http://t2.hddhhn.com/uploads/tu/201707/200/10.jpg'
        },
        {
          title:'xxx',
          Url:'http://t2.hddhhn.com/uploads/tu/201707/200/10.jpg'
        },

      ]
    }
  },

  methods:{

  },
  created() {
    // this.$http.get('/arcticle/arcticleList',{
    //   params:{
    //     b:2
    //   }
    // }).then((res) => {
    //   console.log(res.data);
    // })
  },
  mounted() {
     console.log(111)
  }
}
</script>
