
import { store } from '@/setup'
// import Login from '@/views/auth/Login.vue'
// import Activate from '@/views/auth/Activate.vue'

export default {
  path: '/profile',
  name: 'profile',
  beforeEnter: (to, from, next) => {
    if(!store.getters['isAuth']) next('/login')
    next()
  }
}
