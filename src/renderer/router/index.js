import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/lombard',
      name: 'lombard',
      component: require('@/components/Lombard').default,
    },
    {
      path: '/kassa',
      name: 'sklad',
      component: require('@/components/Kassa').default
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
