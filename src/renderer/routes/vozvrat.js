
import Vozvrat from '@/views/Vozvrat.vue'
import {store} from '@/setup'

export default {
  path: '/vozvrat',
  name: 'vozvrat',
  component: Vozvrat,
  beforeEnter: (to, from, next) => {
    store.dispatch('user/fetchToken').then(res => {
      const { id } = res
      !id ? next('/login') : next()
    })
  }
}
