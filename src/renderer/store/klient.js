import { klient } from '@/db'



const state = {
    klients: {},
}
const getters = {
    klients ({ klients }) {
        return  (klients.rows || []).map(v => v.doc)
    },
    map ({}, { klients }) {
        // const getPassport = ({ passports, selected }) => ({ ...passports[selected] })
        // const klient = (v) => ({ ...v, passport: getPassport(v) })
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