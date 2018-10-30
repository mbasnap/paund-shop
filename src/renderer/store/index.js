import Vue from 'vue'
import Vuex, { mapActions} from 'vuex'
import modules from './modules'


Vue.use(Vuex)

export default new Vuex.Store({

    modules
  })