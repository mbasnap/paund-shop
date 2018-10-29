import Vue from 'vue'
import Vuex from 'vuex'
import {settings, klient, calkulator} from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    settings: (state, getters) => {
      return getters['settings/getAll']
    }
  },
  modules: {settings, klient,calkulator},
  })