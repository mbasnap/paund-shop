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
          path: 'prixod-rasxod',
          name: 'prixod-rasxod',
          component: require('@/components/PrixodRasxod').default
        }
      ]
    },
    {
      path: '/sklad',
      name: 'sklad',
      component: require('@/components/Sklad').default
    },
    {
      path: '/zvit',
      name: 'zvit',
      component: require('@/components/Zvit').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login').default
    },
    {
      path: '/*',
      redirect: {
        name: "lombard"
      }
    }
  ]
})
