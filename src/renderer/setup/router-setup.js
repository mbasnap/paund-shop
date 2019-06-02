
import Vue from 'vue'
import Router from 'vue-router'
import {login, activate} from '@/routes/auth'
import vidacha from '@/routes/vidacha'
import vozvrat from '@/routes/vozvrat'
import sklad from '@/routes/sklad'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    vidacha,
    vozvrat,
    sklad,
    login,
    activate,
    {
      path: '*',
      redirect: '/activate'
    }
  ]
})

export default router
