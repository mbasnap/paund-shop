import { get, post } from '@/functions/db'

const state = {
    // klients: [],
}
const getters = {
  docs({}, {}, { common }) {
    return  common.klients || []
  },
  map ({}, { docs }) {
    return  docs.reduce((obj, v) => ({ ...obj, [v._id]: v}), {})
  }
}
const mutations = {
  klients (state, v) {
    state.klients = v
  }
}
const actions = {
  async save ({ dispatch }, v) {
    const {  date, user } = this.getters
    return post('klients', { ...v, date, user: user._id, type: 'klient' })
      .then(v => dispatch('update', v))
  },
  async remove ({ dispatch }, { _id, deleted }) {
    const _deleted =  deleted === 'remove' && this.getters.isAdmin
    return get('klients', _id).then(v => dispatch('save', { ...v, deleted, _deleted }))
  },
  async update ({ getters }, {id} = {}) {       
    await this.dispatch('update')
    return getters.map[id]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}