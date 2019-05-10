import DataBase from '@/db'
import decode from 'jwt-decode'
import {router} from '@/setup'
const { post, setAuthToken } = new DataBase('user')




const state = {
  user: {},
  userMenu: [ 
    {
      name: "vidacha",
      value: "/vidacha"
    },
    {
      name: "vozvrat",
      value: "/vozvrat"
    },

    {
      name: "sklad",
      value: "/sklad"
    },

  ]
}
const getters = {
  user: ({ user }) => user,
  userMenu: ({ userMenu }) => userMenu,
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
    
    return post('/login', payload).then(token => {
        setAuthToken(token)
      return dispatch('setUser', token)
    })
  },
  logout: ({ commit }) => {
    // Remove token from localStorage
    
    // Remove auth header for future requests
    setAuthToken(false)
    router.push('/login')
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
  actions,
}
