//封装频道相关的请求
import request from "@/utils/axiosreq.js";
function getChannels() {
  return request({
    url: "v1_0/user/channels",
    method: "GET"
  });
}
export { getChannels };
