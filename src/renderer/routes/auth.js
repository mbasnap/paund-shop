
// import { store } from '@/setup'
import { Login, Activate, Register } from '@/components/auth'

export const login = {
  path: '/login',
  name: 'login',
  component: Login,
  beforeEnter: (to, from, next) => {
    // console.log(to, from)
    if (!localStorage.getItem('settings')) next('/activate')
    else if (localStorage.getItem('user')) next('/vidacha')
    else next()
  }
}
// export const register = {
//   path: '/register',
//   name: 'register',
//   component: Register,
//   beforeEnter: (to, from, next) => {
//     console.log('activate');
    
//     if(!store.getters['isActive']) next('/activate')
//     next()
//   }
// }

export const activate = {
  path: '/activate',
  name: 'activate',
  component: Activate,
  // beforeEnter: (to, from, next) => {
  //   if(store.getters['isActive']) next('/login')
  //   next()
  // }
}
