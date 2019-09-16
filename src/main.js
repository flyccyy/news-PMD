import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//使用vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//使用VeeValidate
import VeeValidate, { Validator } from 'vee-validate';
Vue.use(VeeValidate,{
  events:''
});
//导入语言包
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Validator.localize('zh_CN', zh_CN);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
