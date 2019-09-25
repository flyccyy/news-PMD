//封装频道相关的请求
import request from "@/utils/axiosreq.js";
function getChannels() {
  return request({
    url: "v1_0/user/channels",
    method: "GET"
  });
}

//获取全部频道列表
function getAllChannels(){
  return request({
    url:'v1_0/channels',
    method:'GET'
  })
}

//设置用户频道列表
function editChannels(channels){
  return request({
    url:'v1_0/user/channels',
    method:'PUT',
    data:{
      channels
    }
  })
}
export { getChannels,getAllChannels,editChannels };
