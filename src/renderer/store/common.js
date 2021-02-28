import { reduceBy  } from '@/functions'
import { get, post, testAuth } from '@/functions/db'
import { compare, verify, hash, sign } from '@/functions/jwt'
import { router } from '@/setup'

const state = {
  date: new Date(),
  user: {},
  company: {},
  users: [],
  klients: [],
  reestr: [],
}

const getters = {
  brand() {
    return 'PShop'
  },
  version() {
    return 1.10
  },
  company({ company }) {
    return company
  },
  user({ user }) {
    return user
  },
  users({ users }) {
    return users
  },
  usersMap({}, { users }) {
    return reduceBy('name', users)
  },
  lombard({}, { company }) {
    return {...company.lombard }
  },
  isAdmin({}, { user, usersMap }) {
    const { roles = [] } = usersMap[user._id] || {}
    return roles.includes('admin')
  },
  date ({ date }) {
    return date
  },
  settings() {
    const order = JSON.parse(localStorage.getItem('order'))
    const bilet = JSON.parse(localStorage.getItem('bilet'))
    return {
      order: { zoom: "115%", silent: true, ...order },
      bilet: { zoom: "150%", silent: true, ...bilet }
    }
  }
}
const mutations = {
  date (state, v) {
    state.date = v
  },
  company (state, v) {
    state.company = v
  },
  user (state, v) { 
    state.user = v
  },
  users (state, v) { 
    state.users = v
  },
  klients (state, v) { 
    state.klients = v
  },
  reestr (state, v) { 
    state.reestr = v
  }
}
const actions = {
  reload() {
    window.location.reload()
  },
  async setUser({ dispatch }, v) {
    const user = v || await verify(localStorage.getItem('user'))
    if (!user) return dispatch('logOut', true) 
    localStorage.setItem('user', sign({ _id: user._id, name: user.name}, '1h'))
    return user
  },

  loginAdmin({}, password) {
    return testAuth(password).then(() => {
        localStorage.setItem('admin', password)
    }).catch(err => {
        console.error(err);
    })
  },
  async updatePassword({ dispatch }, { user, password } ) {
    return post('users', {...user, password: await hash(password) })
      .then(() => dispatch('logOut'))
  },
  async updateUser({}, user ) {
    const { id, rev } = await post('users', user)
    return {...user, _id: id, _rev: rev }
  },
  async logIn({ dispatch }, { password, user }) {
    if (!await compare(password, user.password))  throw { password: 'Неверный пароль'}
    await dispatch('setUser', user)
    window.location.reload()
  },
  logOut({}, silent) {
    localStorage.removeItem('user')
    silent ? router.push('/login')
    : window.location.reload()
  },
  setDate  ({ commit }, v) {
    commit('date', v)
  },
  async update ({ commit, dispatch }, user) {
    const lombard = localStorage.getItem('lombard')
    commit('user', await dispatch('setUser', user))
    commit('company', await get('company', lombard))
    commit('users', await get('users'))
    commit('klients', await get('klients'))
    commit('reestr', await get('reestr'))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}