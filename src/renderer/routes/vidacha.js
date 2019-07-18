import Vidacha from '@/views/Vidacha'
import {store} from '@/setup'

export default {
  path: '/vidacha',
  name: 'vidacha',
  component: Vidacha,
  // beforeEnter: async (to, from, next) => {
  //   !store.getters['isAuth'] ? next('/login') 
  //   : next()
  // }
}
