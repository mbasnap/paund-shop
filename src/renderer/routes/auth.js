
// import { store } from '@/setup'
import { Login, Activate } from '@/components/auth'

export const login = {
  path: '/login',
  name: 'login',
  component: Login,
  beforeEnter: async (to, from, next) => {
    ['lombard', 'company', 'remote', 'local']
      .some(v => !localStorage.getItem(v)) ?  next('/activate') 
        : localStorage.getItem('user') ? next('/vidacha')
          : next()
  }
}


export const activate = {
  path: '/activate',
  name: 'activate',
  component: Activate,
  // beforeEnter: (to, from, next) => {
  //   if(store.getters['isActive']) next('/login')
  //   next()
  // }
}
