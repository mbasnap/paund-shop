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
      name: 'kassa',
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
      component: require('@/components/auth/Login').default
    },
    {
      path: '/register',
      name: 'register',
      component: require('@/components/auth/Register').default
    },
      {
        path: '/*',
      redirect: {
         name: "lombard"
      }
    }
  ]
})
