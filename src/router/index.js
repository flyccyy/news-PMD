import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    //重定向到首页
    {
      path: "/",
      redirect: "/home"
    },
    {
      name: "tabbar",
      path: "/",
      component: () => import("@/views/tabbar"),
      children: [
        {
          name: "home",
          path: "home",
          component: () => import("@/views/home")
        }
      ]
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/login")
    },
    {
      name:'search',
      path:'/search',
      component:()=>import('@/views/search')
    },
    {
      name:'list',
      path:'/list/:key',
      component:()=>import('@/views/list')
    }
  ]
});
