
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'

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
