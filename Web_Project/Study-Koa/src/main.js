// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import store from './store'
import vueCookie from 'vue-cookie'
import 'element-ui/lib/theme-default/index.css'
import JWT from './utils/jwt'

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(vueCookie)
Vue.http.interceptors.push(JWT.setJwt)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})