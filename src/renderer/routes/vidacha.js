import isAuthenticated from '@/db/isAuthenticated'




import Vidacha from '@/views/Vidacha.vue'

export default {
  path: '/vidacha',
  name: 'vidacha',
  component: Vidacha,
  beforeEnter: isAuthenticated
}
