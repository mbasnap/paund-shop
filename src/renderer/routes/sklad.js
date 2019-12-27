import Sklad from '@/components/sklad'
// import {store} from '@/setup'

export default {
  path: '/sklad',
  name: 'sklad',
  component: Sklad,
  // beforeEnter: async (to, from, next) => {
  //   !store.getters['isAuth'] ? next('/login') 
  //   : next()
  // }
}
