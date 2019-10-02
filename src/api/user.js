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

//关注用户
function followUser(aut_id) {
  return request({
    url: "v1_0/user/followings",
    method: "POST",
    data: {
      target: aut_id
    }
  });
}

//取关用户
function cancelFollowUser(aut_id) {
  return request({
    url: "v1_0/user/followings/" + aut_id,
    method: "DELETE"
  });
}

//获取个人信息
function getUserProfile() {
  return request({
    url: "v1_0/user/profile",
    method: "GET"
  });
}

//编辑用户头像，文件要用formdata
function setUserIcon(photo) {
  let fd = new FormData();
  fd.append('photo',photo)
  return request({
    url: "v1_0/user/photo",
    method: "PATCH",
    data: fd
  });
}

export { userLogin, followUser, cancelFollowUser, getUserProfile, setUserIcon };
