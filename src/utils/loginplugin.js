//全局的登录方法封装为一个插件

import Vue from 'vue'
import store from "@/store"
import router from "@/router"
import {Dialog} from 'vant'
var loginplugin ={}
//参数是Vue
loginplugin.install = function(Vue){
    //给Vue添加全局的方法
    Vue.prototype.$login = function(){
        let user= store.state.user;
        if(!user||!user.token){
            Dialog.confirm({
                title:'注意',
                message:'要进行当前操作时需要登录'
            }).then(()=>{
                router.push('/login')
            }).catch(()=>{
                return;
            })
        }
    }
}
export default loginplugin