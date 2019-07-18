import Vue from 'vue'
import Vuex from 'vuex'
// import klient from '@/store/klient'
import kassa from '@/store/kassa'
import klient from '@/store/klient'
import bilet from '@/store/bilet'
import obespechenie from '@/store/obespechenie'
import common from '@/store/common'
import user from '@/store/user'


Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { common, user,kassa, klient, bilet, obespechenie }
})