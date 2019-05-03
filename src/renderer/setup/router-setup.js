
import Vue from 'vue'
import Router from 'vue-router'
import { home } from '@/routes/home'
import { contacts } from '@/routes/contacts'
import { login } from '@/routes/login'
import { register } from '@/routes/register'
import { postContent } from '@/routes/post-content'
// import { info } from '@/routes/info'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    // info,
    home,
    contacts,
    login,
    register,
    postContent,
  ]
})
