import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
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
        },
        {
          name:'my',
          path:'my',
          component:()=>import('@/views/my')
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
    },
    {
      name:'detail',
      path:'/detail/:art_id',
      component:()=>import('@/views/detail')
    },
    {
      name:'person',
      path:'/person',
      component:()=>import('@/views/person')
    },
    {
      path:'/chat',
      component:()=>import('@/views/chat')
    }
  ]
});
