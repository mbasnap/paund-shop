import { db } from '@/db'
const { get, post} = db('/bilet')

const state = {
    bilets: {},
}
const getters = {
    
    bilets ({ bilets }) {
        return bilets
    },
    emptyNumbers() {
        return ['1', '2', '3']
    },
}
const mutations = {

    bilets (state, v) {
        state.bilets = v
    }
}
const actions = {

    async save ({ dispatch }, v) {
        const _id = await post('/', v)
        return dispatch('update', { ...v, _id })
    },

    async update({ commit }, v) {
        commit('bilets', await get('/'))
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