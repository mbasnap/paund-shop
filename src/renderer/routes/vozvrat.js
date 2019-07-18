
import Vozvrat from '@/views/Vozvrat.vue'
import {store} from '@/setup'

export default {
  path: '/vozvrat',
  name: 'vozvrat',
  component: Vozvrat,
  // beforeEnter: async (to, from, next) => {
  //   !store.getters['isAuth'] ? next('/login') 
  //   : next()
  // }
}
