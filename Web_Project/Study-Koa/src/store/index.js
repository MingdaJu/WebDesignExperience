import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {LOGIN, LOGOUT, ADMIN, USER,AUTH} from './mutation-types'
import * as actions from './actions'

const store = new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    isUser: false,
    userid: '',
    name: '',
    isAuth: false
  },
  actions,
  mutations: {
    [LOGIN](state) {
      state.isLogin = true
    },
    [LOGOUT](state) {
      state.isLogin = false
      state.isUser = false
      state.isAdmin = false
    },
    [ADMIN](state) {
      state.isAdmin = true
    },
    [USER](state, userInfo = {id: '', name: ''}) {
      state.userid = userInfo.id
      state.name = userInfo.name
    },
    [AUTH](state) {
      state.isAuth = true
    }
  }
})

export default store


/**
 * 获取store值
 * this.$store.state.isUser
 * 
 * 修改store值
 * this.$store.commit('USER', {id: 'xxx', name: 'xxxx'})
 */