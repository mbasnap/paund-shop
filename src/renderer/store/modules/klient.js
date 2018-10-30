const defaultKlient = {
    title: "Klient"
}

const state = {
    current: null
}
const getters = {
    current: state => {
        let current = state.current
        return current ? current : defaultKlient
    },
    isSaved: state => {
        let current = state.current
        if (current && current.id) return true
    }
}
const mutations = {
    changeCurrent: (state, payload) => state.current = payload
}
const actions = {
    setCurrent: ({commit}, payload) => commit('changeCurrent', payload),
    clearCurrent: ({commit}) => commit('changeCurrent', null),
    saveCurrent: ({state, commit}) => {
        let Klient = {title: 'name', id: 22}
        commit('changeCurrent', Klient)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}