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
export { getArticles, dislikeArticle,userBlacklist,reportArticle,suggestion };
