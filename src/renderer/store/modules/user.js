import DataBase from '@/db'
import decode from 'jwt-decode'
const { post, setAuthToken } = new DataBase('users')
const state = {
  user: {}
}
const getters = {
  user: ({ user }) => user,
  loginStatus: ({ user }) => !!user.name
}
const mutations = {
  user (state, v) {
    state.user = v
  }
}
const actions = {

setUser({ commit }, token) {
  if(token) return commit('user', decode(token))
},

  register: (state, userData) => {
    return post('/register', userData)
  },

  login: ({ dispatch }, payload) => {
    
    return post('/login', payload).then(res => {
      // Set token to
      localStorage.setItem('jwtToken', res.token)
      // Set token to Auth header
      setAuthToken(res.token)
      return dispatch('setUser', res.token)
    })
  },
  logout: ({ commit }) => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future requests
    setAuthToken(false)
    // Set current user to {} which will set isAuthenticated to false
    commit('user', {})
  },
  remindPassword: ({ dispatch }, payload) => {
    return post('/remind', payload)
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
