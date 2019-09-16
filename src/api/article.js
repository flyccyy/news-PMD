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
export { getArticles };
