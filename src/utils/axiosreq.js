//封装axios请求
import axios from "axios";
import store from '@/store'
const myrequest = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/app/"
});

//定义发送refresh_token请求
const refresh_request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/app/"
})


//请求拦截
myrequest.interceptors.request.use(
  config => {
    if(store.state.user){
      let usertoken = store.state.user.token;
      config.headers.Authorization = `Bearer ${usertoken}`
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//响应拦截
myrequest.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if(error.response.status === 401){
      let refresh_token = store.state.user.refresh_token
      let res = await refresh_request({
        url:'v1_0/authorizations',
        method:'PUT',
        headers:{
          Authorization:`Bearer ${refresh_token}`
        }
      })
      let token = res.data.data.token
      store.commit('setUser',{
        token,
        refresh_token
      })
      //用新的token发请求到服务器
      return myrequest(error.config)
    }
    return Promise.reject(error);
  }
);

export default myrequest;
