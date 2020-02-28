
import { store } from '@/setup'
import { Login, Activate } from '@/components/auth'

export const login = {
  path: '/login',
  name: 'login',
  component: Login,
  beforeEnter: (to, from, next) => {
    console.log(store.getters['isActive']);
    
    // if(store.getters['isAuth']) next('/profile')
    if(!store.getters['isActive']) next('/activate')
    else next()
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
