
import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/setup'
import {login, activate} from '@/routes/auth'
import profile from '@/routes/profile'
import vidacha from '@/routes/vidacha'
import vozvrat from '@/routes/vozvrat'
import sklad from '@/routes/sklad'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    profile,
    vidacha,
    vozvrat,
    sklad,
    login,
    activate,
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
router.beforeEach( async (to, {name}, next) => {
  if (!name) {
    await store.dispatch('update')
    // await store.dispatch('user/update')
  }
  next()
})
export default router
