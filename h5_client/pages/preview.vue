<template>
  <div class="article-detail-cont" v-if="detail">
     <div class="article-detail-title">
      {{detail.Title}}
     </div>

      <div class="flex flex-align-center flex-justify-between article-info">
        <div class="article-info-left">{{detail.Author}}  
          <span class="article-info-time"> {{detail.CreatTime}}</span>
        </div>  

        <div class="flex flex-align-center flex-justify-between article-info-numbercont">
          <div class="flex flex-align-center flex-justify-end article-info-zan">
            <img src="/zan-kong.svg" class=" article-info-icon">
            <div class="article-info-number">
              0 
            </div>
          </div>

          <div class="flex flex-align-center flex-justify-end article-info-zan">
            <img src="~assets/icon/view.svg" class=" article-info-icon">
            <div class="article-info-number">
              0 
            </div>
          </div>
        </div>   
      </div>
      
      
      <!-- 简介 -->
      <div class="article-brief font gray9" v-if="detail.Brief">
         简介：{{detail.Brief}}
      </div>

      
      <!-- 封面 -->
      <div class="article-cover bg-full-img" :style="{background: `url(${ detail.Url })`}" v-if="detail.Url" >
      </div>

      
      <!-- 内容 -->
      <div class="gray6 font-l article-content detail-content " v-html="detail.Content" >
        
      </div>


      <div class="flex page-bottom">
        <div class=" page-bottom-btn page-bottom-btn-plain" @click="">
          修改
        </div>

        <div class=" page-bottom-btn " @click="">
          发布
        </div>
      </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      detail:{
        Title:'Noven技术生涯经验分享'
      },
      authorInfo:{},
    }
  },


  methods:{

    
  },
  created() {

  },
  mounted() {
    
  },
  computed: {

  }
}
</script>
