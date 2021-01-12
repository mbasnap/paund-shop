import Vidacha from '@/components/vidacha'
// import {store} from '@/setup'

export default {
  path: '/vidacha',
  name: 'vidacha',
  component: Vidacha,
  beforeEnter: async (to, from, next) => {
    ['user', 'lombard', 'company', 'remote', 'local']
      .some(v => !localStorage.getItem(v)) ?  next('/login') 
        : next()
  }
}
