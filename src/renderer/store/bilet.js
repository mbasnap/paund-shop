const state = {
    bilets: [],
    bilet: {}
}
const getters = {
    bilet ({bilet}) {
        return bilet
    },
    obespechenie ({bilet}) {
        return bilet.obespechenie || [
            {title: 'ring', proba: '583', ves: 2.00, derty: 1},
            {title: 'ring', proba: '583', ves: 2.22}
        ]
    },
    summ_ves ({}, getters) {
        return getters.obespechenie.reduce((total, current) => total + current.ves, 0)
    },
    summ_derty ({}, getters) {
        return getters.obespechenie.reduce((total, {derty}) => total += derty || 0, 0)
    },

    bilets ({bilets}) {
        return bilets
    }
}
const mutations = {

}
const actions = {
    save ({commit}, payload) {

    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}