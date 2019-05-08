const state = {
    bilets: [],
    bilet: {},
}
const getters = {
    bilet ({bilet}) {
        return bilet
    },

    bilets ({bilets}) {
        return bilets
    }
}
const mutations = {

    bilet (state, v) {
        state.bilet = v
    }
}
const actions = {

    clearAll ({commit, dispatch}, v) {
        commit('bilet', {})
        dispatch('obespechenie/clear')
    },
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}