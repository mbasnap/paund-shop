import { db, setHeaders, decode } from '@/db'
import {router} from '@/setup'
const { post } = db('lombard')
const tokenName = 'x-user'

const state = {
  user: {},

  err: ''
}
const getters = {
  user ({ user }) {
    return user
  },
  err ({ err }) {
    return err
  },
  isAuth ({user}) {
    return !!user.id
  }
}
const mutations = {
  user (state, v) {
    state.user = v
  },
  err (state, v) {
    state.err = v
  }
}
const actions = {

  login ({ dispatch}, v) {
    post('/login', v).then(token => {
      localStorage.setItem(tokenName, token)
      dispatch('update', '/vidacha')
    })
  },

  logout ({ dispatch }) {
    // post('/logout').then( () => {
      localStorage.removeItem(tokenName)
      dispatch('update', '/login')
    // })
  },

  fetchToken () {
      return decode(localStorage.getItem(tokenName))
  },

  update ({ commit }, path) {
    const token = localStorage.getItem(tokenName)
    setHeaders(tokenName, token)
    commit('user', decode(token))
    if (path) router.push(path)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
