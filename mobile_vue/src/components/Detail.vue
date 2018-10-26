<template>
  <div class="detail-wrap">
    <div class="title">{{ detailData.Title }}</div>
    <div class="author-info">
      <span class="article-word">article</span>
      <span class="author">@{{ detailData.Author }}</span>
      <span class="time">{{ detailData.CreateTime }}</span>
    </div>
    <div class="read-collect-count">
      <span class="read-count">阅读量：{{ detailData.ReadCount }}</span>
      <span class="collect-count">收藏量：{{ detailData.CollectCount }}</span>
    </div>
    <div class="detail-img">
      <img :src="detailData.Url" alt="">
    </div>
    <div class="content">
      {{ detailData.Content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      detailData: {
        Title: "我是文章详情的标题",
        Author: "作者",
        CreateTime: "2018-10-24",
        Url: "http://temp.im/364x172",
        CollectCount: 1,
        ReadCount: 2,
        Content: "这里是文章的内容。这里是文章的内容。这里是文章的内容。这里是文章的内容。这里是文章的内容。这里是文章的内容。"
      }
    }
  },
  methods:{
    
  },

  mounted() {
    console.log(this.$route.query.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .title {
    margin-top: .5rem;
    text-align: center;
    font-size: .24rem;
  }
  .author-info {
    margin-top: .2rem;
    text-align: center;
    .article-word {
      color: #5ed49d;
    }
    .author, .time {
      margin-left: .2rem;
    }
    .time {
      font-size: .16rem;
    }
  }
  .read-collect-count {
    margin-top: .2rem;
    text-align: center;
    font-size: .16rem;
    .collect-count {
      margin-left: .3rem;
    }
  }
	.detail-img {
    margin: 0 auto;
    margin-top: .5rem;
    width: 3.64rem;
    height: 1.72rem;
    border: 1px solid red;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    margin: 0 auto;
    margin-top: .5rem;
    width: 3.64rem;
    color: #666;
  }
</style>
