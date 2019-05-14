import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user'
import klient from '@/store/klient'
import kassa from '@/store/kassa'
import bilet from '@/store/bilet'
import obespechenie from '@/store/obespechenie'
import common from '@/store/common'


Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { common, user, klient, kassa, bilet, obespechenie }
})