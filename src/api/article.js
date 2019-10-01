//封装文章内容相关的请求
import request from "@/utils/axiosreq.js";
function getArticles({ channel_id, timestamp, with_top }) {
  return request({
    url: "v1_1/articles",
    method: "GET",
    params: {
      channel_id,
      timestamp,
      with_top
    }
  });
}

//对文章不喜欢（隐藏信息）
function dislikeArticle(target) {
  return request({
    url: "v1_0/article/dislikes",
    method: "POST",
    data: {
      target
    }
  });
}

//拉黑用户
function userBlacklist(target){
  return request({
    url:'v1_0/user/blacklists',
    method:'POST',
    data:{
      target
    }
  })
}

//举报文章
function reportArticle({target,type}){
  return request({
    url:'v1_0/article/reports',
    method:'POST',
    data:{
      target,
      type,
      remark:'举报'
    }
  })
}

//获取联想建议
function suggestion(key){
  return request({
    url:'v1_0/suggestion',
    method:'GET',
    params:{
      q:key
    }
  })
}

//获取搜索结果（list组件）
function getList({page,per_page,q}){
  return request({
    url:'v1_0/search',
    method:'GET',
    params:{
      page,
      per_page,
      q
    }
  })
}

//获取新闻文章详情
function getArticleDetail(art_id){
  return request({
    url:`v1_0/articles/${art_id}`,
    method:'GET'
  })
}

//对文章点赞
function likeArticle(art_id){
  return request({
    url:'v1_0/article/likings',
    method:'POST',
    data:{
      target:art_id
    }
  })
}

//取消对文章点赞
function disliking(art_id){
  return request({
    url:'v1_0/article/likings/'+art_id,
    method:'DELETE',
  })
}

//取消对文章不喜欢
function cancelDislikeArticle(art_id) {
  return request({
    url: "v1_0/article/dislikes/"+art_id,
    method: "DELETE",

  });
}
export { getArticles, dislikeArticle,userBlacklist,reportArticle,suggestion,getList,getArticleDetail,likeArticle,disliking,cancelDislikeArticle };
