import { get, post } from '@/db'

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
        const {  lombard } = this.getters
        const { family, name, sername } = v
        return ![family, name, sername].some(v => !v) ? 
            post('klients', { lombard, ...v, type: 'klient' })
            .then(v => dispatch('update', v)) : false
    },
    async remove ({ dispatch }, v) {
        return get('klients', v._id)
            .then(v => dispatch('save', {...v, _deleted: true }))
    },
    async update ({ commit, getters }, v) {       
        // commit('klients', await get('klients'))
        await this.dispatch('update')
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