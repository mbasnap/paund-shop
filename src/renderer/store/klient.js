import { klient } from '@/db'

const state = {
    klients: {},
}
const getters = {
    docs ({ klients }) {
        return  (klients.rows || []).map(v => v.doc) || []
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
        return dispatch('update', await klient.post(v))
    },
    async remove ({ dispatch }, v) {
        return klient.get(v._id)
            .then(v => dispatch('save', {...v, _deleted: true }))
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