import { db } from '@/db'
const { get, post} = db('/klient')

const state = {
    klients: [],
}
const getters = {

    klients ({ klients }) {
        return [ ...klients]
    }
}
const mutations = {

    klients (state, v) {
        return state.klients = v
    }
}
const actions = {
    
    async save ({ dispatch }, v) {
        const _id = await post('/', v)
        return dispatch('update', { ...v, _id })
    },

    async update ({ commit }, v) {
        commit('klients', await get('/'))
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