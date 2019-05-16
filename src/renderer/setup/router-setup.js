
import Vue from 'vue'
import Router from 'vue-router'
import {login, register, activate} from '@/routes/auth'
import home from '@/routes/home'
import vidacha from '@/routes/vidacha'
import vozvrat from '@/routes/vozvrat'
import prixod_rasxod from '@/routes/prixod-rasxod'
import report from '@/routes/report'
import sklad from '@/routes/sklad'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    home,
    vidacha,
    vozvrat,
    prixod_rasxod,
    report,
    sklad,
    login,
    register,
    activate
  ]
})

export default router
