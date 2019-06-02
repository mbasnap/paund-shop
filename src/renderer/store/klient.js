import { db } from '@/db'
const { post } = db('klient')

const state = {
    klient: {},
}
const getters = {
    klients: (state) => [],
    klient: ({klient}) => klient,
    err: ({err}) => err,
}
const mutations = {

    klient (state, v) {
        state.klient = v
    },
    err (state, v) {
        state.err = v
    },

}
const actions = {

    save ({ commit }, v) {
        return post('/', v)
            .catch(err => commit('err', err))
    },
    set: ({commit}, v) => {
        commit('klient', v)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}