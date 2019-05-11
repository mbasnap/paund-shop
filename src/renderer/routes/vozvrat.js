
import Vozvrat from '@/views/Vozvrat.vue'
import {isAuthenticated} from './functions'

export default {
  path: '/vozvrat',
  name: 'vozvrat',
  component: Vozvrat,
  beforeEnter: isAuthenticated
}
