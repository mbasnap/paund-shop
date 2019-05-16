
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Activate from '@/views/auth/Activate.vue'

export const login = {
  path: '/login',
  name: 'login',
  component: Login
}

export const register = {
  path: '/register',
  name: 'register',
  component: Register
}

export const activate = {
  path: '/activate',
  name: 'activate',
  component: Activate
}
