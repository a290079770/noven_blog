<template>
  <nuxt-link :to="{ name:'detail',query:{id : item.Id} }">
    <section class="flex-center arc-index-item">
      <section class="flex flex-align-center flex-justify-between arc-index-item-cont">
        <div class="arc-index-item-cover bg-full-img" :style="{background: `url(${ item.Url})`}">
          
        </div>
        <div class="arc-index-item-info-cont">
          <p class=" gray6 font-xs arc-index-item-info">
            <span class="primary">article&nbsp;</span>
            <span>@{{item.Author}}&nbsp;</span>
            <span class="gray9">{{item.CreateTime}}</span>
          </p>
          <h2 class="arc-index-item-title text-ess-1">
            {{item.Title}}
          </h2>
          <p class="gray6 font text-ess-2 arc-index-item-abs" style="-webkit-box-orient: vertical">
            {{item.Brief || '博主很懒，没有留下简介信息，点击去看详情吧~~~'}}
          </p>
        </div>
      </section>
    </section>
  </nuxt-link>
</template>

<script>

export default {
  props:{
    item:{
      type:Object
    }
  },
  data() {
    return {
      
    }
  },

  methods:{},
  created() {
    
  },
  mounted() {
    
  },
}
</script>

<style lang="less" scoped>
  @import '~assets/style/varite.less';
  .arc-index-item {
    transition: @transition;
    margin-top: 20px;
    height: 280px;
    width: 100%;
    background: white;
    border-radius: @borderRadius;
    cursor: pointer;
    &:hover {
     .box-hover(); 
    };

    .arc-index-item-cont {
      width: 700px;
      height: 205px;
      .arc-index-item-cover {
        margin-right: 25px;
        width: 300px;
        height: 100%;
      }

      .arc-index-item-info-cont {
        height: 100%;
        width: 375px;
        .arc-index-item-info {
          height: 34px;
          line-height: 34px;
        }

        .arc-index-item-title {
          font-size: 20px;
          height: 50px;
          line-height: 30px;
        }

        .arc-index-item-abs {
          -webkit-line-clamp: 5;
          line-height: 22px;
        }
      }
    }
  }
</style>