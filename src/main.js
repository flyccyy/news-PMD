import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Lazyload } from "vant";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
//使用vant
import Vant from "vant";
import "vant/lib/index.css";
import VeeValidate, { Validator } from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN";
//导入自己封装的登录方法的插件
import loginplugin from "@/utils/loginplugin.js";
// import cors from 'cors'

Vue.use(Vant);
//使用VeeValidate
Vue.use(VeeValidate, {
  events: ""
});
//Lazyload配合van-image的lazy-load使用
Vue.use(Lazyload);

Vue.use(loginplugin);
// Vue.use(cors())
//导入语言包
Validator.localize("zh_CN", zh_CN);
//dayjs
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

Vue.filter("dateFormat", value => {
  return dayjs().from(dayjs(value));
});
Vue.filter("commentFormat", value => {
  return dayjs(value).format("MM-DD HH:mm");
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
