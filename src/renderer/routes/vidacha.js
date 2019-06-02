import Vidacha from '@/views/Vidacha.vue'
import {store} from '@/setup'

export default {
  path: '/vidacha',
  name: 'vidacha',
  component: Vidacha,
  beforeEnter: (to, from, next) => {
    store.dispatch('user/fetchToken').then(res => {
      const { id } = res
      !id ? next('/login') : next()
    })
  }
}
