import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/lombard',
      name: 'lombard',
      component: require('@/components/Lombard').default,
      children: [
        {
          path: 'vidacha',
          name: 'vidacha',
          component: require('@/components/Vidacha').default
        },
        {
          path: 'vozvrat',
          name: 'vozvrat',
          component: require('@/components/Vozvrat').default
        },
        {
          path: '/*',
          redirect: {
          name: "vidacha"
          }
        }
      ]
    },
    {
      path: '/*',
      redirect: {
        name: "lombard"
      }
    }
  ]
})
