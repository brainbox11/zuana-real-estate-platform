import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import Routes from './routes'
import axios from 'axios'
import VueMeta from 'vue-meta'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMeta)

Vue.prototype.$axios = axios
Vue.prototype.$appId = "4f5a0973-0996-406b-81e8-14b19c13646f"
// Vue.prototype.$payStack = 'pk_test_195f76463d01391da959959847370b643ee9f646'
Vue.prototype.$payStack = 'pk_live_57706a07e5917481547fb496352d71135dff4360'
Vue.prototype.$onesignalRequestUrl = "https://onesignal.com/api/v1/notifications"
Vue.prototype.$onesignalHeader = {
  'Authorization': 'Basic NDAzYWQ1NzUtMWUxZi00YzQ5LTg2ZGUtNWRkMzJiNjM4ODQ5',
  'Content-Type': 'application/json'
}
Vue.prototype.$baseUrl = "https://zuana.com.ng"

const router = new VueRouter({
  routes: Routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // return savedPosition
      return { x: 0, y: 0 }
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    if (localStorage.uid === undefined) {
      // Output a feedback message to the user and redirects user to home page!
      store.dispatch('setSnackText', "Requested page is restricted to only registered user! Login into your account to continue...")
      store.dispatch('setSnackState', true)

      // Prompts User To login
      store.state.loginDialog = true

      next(false)
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  store,
  render: h => h(App),
  router: router
}).$mount('#app')