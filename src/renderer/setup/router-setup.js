
import Vue from 'vue'
import Router from 'vue-router'
// import { store } from '@/setup'
import { login, activate } from '@/routes/auth'
// import profile from '@/routes/profile'
import vidacha from '@/routes/vidacha'
import vozvrat from '@/routes/vozvrat'
import sklad from '@/routes/sklad'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    // profile,
    vidacha,
    vozvrat,
    sklad,
    login,
    activate,
    // register,
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
// router.beforeEach( async ({ name }, from, next) => {
  // next()
  // if (name !== 'activate') router.push('/activate')
  // else next()
// })
export default router
