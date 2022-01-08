import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/views/Main.vue')
    },
    {
      path: '/create',
      name: 'InputBlock',
      component: () => import('@/views/InputBlock.vue')
    }
  ]
})
