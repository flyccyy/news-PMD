import Vue from 'vue'
import Vuex from 'vuex'
import * as author from '@/utils/usertoken.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:author.getToken()
  },
  mutations: {
    setUser(state,val){
      author.setToken(val)
      state.user = val
    }
  },
  actions: {

  }
})
