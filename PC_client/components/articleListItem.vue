<template>
  <section  class="flex-center pr arc-list-item">
    <div class="flex-center arc-list-item-date-cont font-xs">
      <div class="arc-list-item-date-corner">
        
      </div>
      {{item.CreateTime}}
    </div>

    <section class="flex flex-justify-between arc-list-item-cont">
      <section class="arc-list-item-cover" :style="{background: `url(${item.Url}) no-repeat center`, backgroundSize:'cover' }">
      </section>
      <section class="flex flex-justify-between flex-column arc-list-item-info-cont">
        <h2 class="font-lg text-ess-1">
          {{item.Title}}
        </h2>
        <p class="gray6 font text-ess-2 arc-list-item-abs" style="-webkit-box-orient: vertical">
          {{item.Brief || '博主很懒，没有留下简介信息，点击去看详情吧~~~'}}
        </p>
        <div class="flex flex-justify-between gray6 font">
          <div class="flex">
            <span class="flex flex-align-center arc-list-item-view-icon-cont ">
              <img class="arc-list-item-view-icon" style="width: 19px" src="~assets/icon/write-gray.svg">
              <span>{{item.Author}}</span>
            </span>
            <span class="flex flex-align-center arc-list-item-view-icon-cont ">
              <img class="arc-list-item-view-icon" src="~assets/icon/view.svg">
              <span>{{item.ReadCount}}次浏览</span>
            </span>
            <span class="flex flex-align-center arc-list-item-view-icon-cont">
              <img class="arc-list-item-view-icon" src="~assets/icon/zan-kong.svg">
              <span>{{item.CollectCount}}次收藏</span>
            </span>
          </div>
          <div>
            <button @click="goTo('/detail',`id=${item.Id}`)" class="arc-list-item-btn font">立即阅读</button>
          </div>
        </div>
      </section>
    </section>
  </section>
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
    
  }
}
</script>

<style lang="less" scoped>
  @import '~assets/style/common.less';
  .arc-list-item {
    transition: @transition;
    margin-bottom: 20px;
    height: 180px;
    width: 100%;
    background: white;
    border-radius: @borderRadius;
    &:hover {
     .box-hover(); 
    };

    .arc-list-item-cont {
      width: 760px;
      height: 140px;
      .arc-list-item-cover {
        margin-right: 20px;
        width: 200px;
        height: 100%;
      }

      .arc-list-item-info-cont {
        width: 540px;
        height: 100%
      }

      .arc-list-item-abs {
        margin-top: 5px;
        -webkit-line-clamp: 3;
        line-height: 22px;
        height: 75px;
        line-height: 25px;
      }
      
      .arc-list-item-view-icon-cont {
        margin-right: 15px
      }

      .arc-list-item-view-icon {
        margin-right: 5px;
        width: 18px;
      }

      .arc-list-item-btn {
        width: 80px;
        height: 30px;
        border: none;
        outline: none;
        border-radius: 4px;
        background-color: @primary;
        color: white;
        cursor: pointer;
      }
    }

    .arc-list-item-date-cont {
      position: absolute;
      left: 20px;
      top: -10px;
      width: 75px;
      height: 25px;
      background: @primary;
      color: white;
      .arc-list-item-date-corner {
        position: absolute;
        left: -10px;
        top: 0px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 10px 10px;
        border-color: transparent transparent #c01e22 transparent;
      }
      &::before {
        content: '';
        position: absolute;
        left: -10px;
        top: 0px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 10px 10px;
        border-color: transparent transparent rgba(0,0,0,0.15) transparent;
      }
    }
  }
</style>