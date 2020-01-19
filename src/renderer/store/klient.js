import { klient } from '@/db'



const state = {
    klients: {},
}
const getters = {
    klients ({ klients }) {
        const rows = klients.rows || []
        return  rows.map(v => v.doc)
    },
    map ({}, { klients }) {
        return  klients.reduce((obj, v) => ({ ...obj, [v._id]: v}), {})
    }
}
const mutations = {
    klients (state, v) {
        state.klients = v
    }
}
const actions = {
    async save ({ dispatch }, v) {    
        const { id: _id } = await klient.post(v)
        return dispatch('update', { ...v, _id })
    },
    async update ({ commit }, v) {       
        commit('klients', await klient.allDocs({ include_docs: true }))
        return v
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}