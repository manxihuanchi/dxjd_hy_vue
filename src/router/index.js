import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve=>require(['@/components/login'],resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: resolve=>require(['@/components/home'],resolve)
    },
  ]
})
