import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user'
import klient from '@/store/klient'
import settings from '@/store/settings'
import calkulator from '@/store/calkulator'


Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { user, klient, settings, calkulator }
})