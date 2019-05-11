import DataBase from '@/db'
import decode from 'jwt-decode'
const name = 'user'
const { post, setHeadersToken } = new DataBase(name)




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
  ],
  token: ''
}
const getters = {
  user: ({ user }) => user,
  userMenu: ({ userMenu }) => userMenu,
  isAuthenticated: ({user}) => !!user.name
}
const mutations = {
  user (state, v) {
    state.user = v
  }
}
const actions = {

  setUser ({ commit }, token) {
    console.log(token)
    setHeadersToken(token)
    return commit('user', token ? decode(token) : {})
  },

  updateFromToken: ({ dispatch}) => 
    dispatch('setUser', localStorage.getItem('user_token')),

  register (state, userData)  {
    return post('/register', userData)
  },

  login: ({ dispatch }, v) =>
   post('/login', v).then(token => {
     localStorage.setItem('user_token', token)
    return dispatch('setUser', token)
   }),

  logout ({ dispatch }) {
    localStorage.removeItem('user_token')
    return dispatch('setUser', false)
  },

  remind ({ dispatch }, payload)  {
    return post('/remind', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
