import Vue from 'vue'
<<<<<<< HEAD
import Vuex, { mapActions} from 'vuex'
import modules from './modules'
=======
import Vuex from 'vuex'
import {settings, klient, calkulator} from './modules'
>>>>>>> 145846c28cbd3d758a0a6c5140c354fd4bef56ff


Vue.use(Vuex)

export default new Vuex.Store({
<<<<<<< HEAD
    getters: {
      klient: (state, getters) => getters['klient/get'],
      settings: (state, getters) => getters['settings/get']
    },
    actions: {
       saveSettings: ({dispatch}, data) => {
         dispatch('settings/save', data)
       }
    },
    modules
=======
  getters: {
    settings: (state, getters) => {
      return getters['settings/getAll']
    }
  },
  modules: {settings, klient,calkulator},
>>>>>>> 145846c28cbd3d758a0a6c5140c354fd4bef56ff
  })