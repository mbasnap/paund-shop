import Sklad from '@/views/Sklad.vue'
import {isAuthenticated} from './functions'

export default {
  path: '/sklad',
  name: 'sklad',
  component: Sklad,
  beforeEnter: isAuthenticated
}
