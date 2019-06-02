import Sklad from '@/views/Sklad.vue'
import {store} from '@/setup'

export default {
  path: '/sklad',
  name: 'sklad',
  component: Sklad,
  beforeEnter: (to, from, next) => {
    store.dispatch('user/fetchToken').then(res => {
      const { id } = res
      !id ? next('/login') : next()
    })
  }
}
