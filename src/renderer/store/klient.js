import { klient } from '@/db'

const state = {
    klients: {},
}
const getters = {
    docs ({ klients }) {
        return  (klients.rows || []).map(v => v.doc) || []
    },
    klients ({}, { docs }) {
        return  docs.filter(v => !v.user)
    },
    users ({}, { docs }) {
        return  docs.filter(v => v.user)
    },
    map ({}, { klients, users }) {
        return  [...klients, ...users].reduce((obj, v) => ({ ...obj, [v._id]: v}), {})
    }
}
const mutations = {
    klients (state, v) {
        state.klients = v
    }
}
const actions = {
    async save ({ dispatch }, v) {    
        return dispatch('update', await klient.post(v))
    },
    async update ({ commit, getters }, { id } = {}) {       
        commit('klients', await klient.allDocs({ include_docs: true }))
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