import { get, post } from '@/db'

const state = {
    klients: [],
}
const getters = {
    docs ({ klients }) {
        return  klients || []
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
        const {  lombard } = this.getters
        return post('klients', { lombard, type: 'klient', ...v})
            .then(v => dispatch('update', v))
    },
    async remove ({ dispatch }, v) {
        return get('klients', v._id)
            .then(v => dispatch('save', {...v, _deleted: true }))
    },
    async update ({ commit, getters }, v) {       
        commit('klients', await get('klients'))
        return getters.map[{ ...v}.id]
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}