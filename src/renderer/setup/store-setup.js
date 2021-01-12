import Vue from 'vue'
import Vuex from 'vuex'
import common from '@/store/common'
import reestr from '@/store/reestr'
import klient from '@/store/klient'


Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { common, reestr, klient }
})