import Vidacha from '@/views/Vidacha.vue'
import {isAuthenticated} from './functions'

export default {
  path: '/vidacha',
  name: 'vidacha',
  component: Vidacha,
  // beforeEnter: isAuthenticated
}
