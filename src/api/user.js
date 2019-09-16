//封装跟用户相关的请求
import request from "@/utils/axiosreq.js";

function userLogin({ mobile, code }) {
  return request({
    url: "v1_0/authorizations",
    method: "POST",
    data: {
      mobile,
      code
    }
  });
}
export { userLogin };
