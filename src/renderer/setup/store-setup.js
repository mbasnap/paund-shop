import Vue from 'vue'
import Vuex from 'vuex'
import ui from '@/store/ui'
import post from '@/store/post'
import menu from '@/store/menu'
import user from '@/store/user'
import modal from '@/store/modal'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { ui, post, menu, user, modal }
})