const state = {
    bilets: [],
    bilet: {},
    obespechenie: []
}
const getters = {
    bilet ({bilet}) {
        return bilet
    },
    obespechenie ({obespechenie}) {
        return obespechenie
    },

    bilets ({bilets}) {
        return bilets
    }
}
const mutations = {
    obespechenie (state, v) {
        state.obespechenie = v
    },
    bilet (state, v) {
        state.bilet = v
    }
}
const actions = {
    addObespechenie ({state, commit}, v) {
        commit('obespechenie', [...state.obespechenie, v])
    },
    clearBilet ({commit}, v) {
        commit('bilet', {})
        commit('obespechenie', [])
    },
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}