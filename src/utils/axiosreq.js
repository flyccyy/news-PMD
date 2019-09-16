//封装axios请求
import axios from "axios";
import store from '@/store'
const myrequest = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/app/"
});

//请求拦截
myrequest.interceptors.request.use(
  config => {
    //如果用户已经登录了才设置请求头
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
  error => {
    return Promise.reject(error);
  }
);

export default myrequest;
