import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/vidacha',
      name: 'vidacha',
      component: require('@/components/Vidacha').default
    },
    {
      path: '/vozvrat',
      name: 'vozvrat',
      component: require('@/components/Vozvrat').default
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
