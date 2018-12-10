//文章相关所有api请求
import Vue from 'vue';

/**
 * [arcticleList 获取文章列表]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam    
 * @possibleParam  [Number]  ps  每页条数  
 * @possibleParam  [Number]  cp  当前页  
 * @possibleParam  [String]  keywords  搜索关键字  
 * @possibleParam  [Number]  authorId  要查询的作者id  
 * @possibleParam  [Boolean]  isMy  是否是查当前用户  
 * @possibleParam  [Date]  startTime  搜索开始时间  
 * @possibleParam  [Date]  endTime  搜索结束时间  
 * @possibleParam  [String]  order  排序方式  精选 - CollectCount  热门 - ReadCount  
 */
export const getArticleList = function(ps=10,cp=1,keywords='',order='CreateTime',isMy=false) {
  return Vue.prototype.$http.get('/arcticle/arcticleList',{
    params:{
      ps,
      cp,
      keywords,
      order,
      isMy
    }
  })
  .then(res => {
    let { list, recordCount } = res;
    //解析数据，处理日期格式等
    list = list.map(item => {
      item.CreateTime = Vue.prototype.dateFormat(item.CreateTime.replace(/-/g,'/'),'yyyy-mm-dd')
      item.Url = item.Url || Vue.prototype.getDefaultCover()
      return item;
    })

    return { list , recordCount };
  })
}

/**
 * [arcticleList 获取文章详情]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  [Number]  id  文章id
 */
export const getArticleDetail = function(id) {
  return Vue.prototype.$http.get('/arcticle/detail',{
    params:{
      Id:id
    }
  })
  .then(res => {
    return Object.assign({},res,parseDetail(res));
  })
}


/**
 * [delete 删除一篇文章]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  [Number]  id  文章id
 */
export const deleteArticle = function(id) {
  return Vue.prototype.$http.post('/arcticle/delete',{
    Id:id
  })
}


/**
 * [arcticleList 新增或修改文章]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  [String]  articleInfo.Title  文章标题
 * @neccessaryParam  [String]  articleInfo.Author  文章作者
 * @neccessaryParam  [String]  articleInfo.Content  文章内容
 * @possibleParam  [Number]  articleInfo.Id  文章id，修改时有
 * @possibleParam  [any]  其他修改时自动带的文章信息
 */
export const createOrUpdate = function(articleInfo) {
  return Vue.prototype.$http.post('/arcticle/createOrUpdate',{
    ...articleInfo
  })
}


/**
 * [collect 收藏或者取消收藏-点赞]
 * @Author   罗文
 * @DateTime 2018-09-26
 * @neccessaryParam  [Number]  id  文章id
 * @neccessaryParam  [Boolean]  isCollect  要收藏还是取消
 */
export const collect = function({ id , isCollect }) {
  return Vue.prototype.$http.post('/arcticle/collect',{
    id, 
    isCollect
  })
  .then(res => {
    return Object.assign({},res,parseDetail(res));
  })
}


/**
 * [parseDetail 解析文章详情，主要是处理日期兼容safari和小程序端创建文章的问题]
 * @Author   罗文
 * @DateTime 2018-12-10
 * @param    {[Object]}   res [文章详情]
 * @return   {[type]}           [description]
 */
function parseDetail(res) {
  let { AppCode , CreateTime , Url , Content } = res;
  CreateTime = Vue.prototype.dateFormat(CreateTime.replace(/-/g,'/'),'yyyy-mm-dd')
  
  //针对微信小程序平台发布的文章，其是json字符串，需要进行额外的处理
  if(AppCode == 3) {
    try {
      let parseContent = JSON.parse(Content);
      Content = parseContent.reduce( ( prevStr,current) => {
        if(current.type == 'text') {
          return prevStr + `<p>${current.value}</p>`
        }else {
          return prevStr + `<p><img src="${current.value}"/><br/><span style="padding-left:26px">${current.desc}</span></p>`
        }
      },'')
    }catch(e) {
      console.log(e)
    }
  }

  return {
     AppCode,
     CreateTime,
     Url,
     Content 
  }
}
