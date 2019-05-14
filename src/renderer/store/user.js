import db from '@/db'
const { post, get, updateToken } = db('user')


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
  isAuthenticated ({user}) {
    return !!user.name
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

  set ({ commit }, v) {
    return commit('user', v)
  },

  init ({ dispatch, commit}) {
    return dispatch('set', updateToken())
      .catch(err => commit('err', err))
  },

  register ({commit}, v)  {
    return post('/register', v)
      .catch(err => commit('err', err))
  },

  login ({ dispatch, commit }, v) {
    return post('/login', v)
      .then(res => dispatch('set', updateToken(res)))
        .catch(err => commit('err', err))
  },

  logout ({ dispatch }) {
    return dispatch('set', updateToken(false))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
