import Vue from 'vue'
import Vuex, { mapActions} from 'vuex'
import modules from './modules'


Vue.use(Vuex)

export default new Vuex.Store({
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
  })