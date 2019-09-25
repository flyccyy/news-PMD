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
Vue.use(Vant);
//使用VeeValidate
import VeeValidate, { Validator } from "vee-validate";
Vue.use(VeeValidate, {
  events: ""
});
//Lazyload配合van-image的lazy-load使用
Vue.use(Lazyload);
//导入语言包
import zh_CN from "vee-validate/dist/locale/zh_CN";
Validator.localize("zh_CN", zh_CN);
//dayjs
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

Vue.filter("dateFormat", value => {
  return dayjs().from(dayjs(value))
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
