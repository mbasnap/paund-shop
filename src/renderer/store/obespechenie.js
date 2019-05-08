
const state = {
    obespechenie: []
}
const getters = {
    items ({obespechenie}) {
        return obespechenie
    },
    summ: (name) => ({obespechenie}) => {
        return  obespechenie.reduce((total, item) => total += item[name] || 0, 0) 
    },
}
const mutations = {
    update (state, v) {
        state.obespechenie = v
    },
}
const actions = {
    save ({dispatch}, v) {
        return v.index !== void 0 ? dispatch('update', v) : dispatch('add', v)
    },
    update ({state, commit}, v) {
        state.obespechenie[v.index] = v
        return commit('update', [...state.obespechenie])
    },
    add ({state, commit}, v) {
        return commit('update', [...state.obespechenie, v])
    },
    clear ({state, commit}, v) {
        return commit('update', [])
    },
}

export default {
     namespaced: true,
    state,
    getters,
    mutations,
    actions
}