

const state = {
    selected: null,
    klients: [
        {name: 'vasia', sername: 'vladimirivich', family: 'camoshkin'},
        {name: 'vasia', sername: 'vladimirivich', family: 'ionov'},
        {name: 'petia', sername: 'vladimirivich', family: 'melichov'},
        {name: 'kolia', sername: 'vladimirivich', family: 'igrunev'},
    ]
}
const getters = {
    getAll: ({klients}) => klients || [],
    getSelected: ({selected}) => selected || {}
}
const mutations = {
    selected: (state, payload) => state.selected = payload
}
const actions = {
    clear: ({commit}) => {
        commit('selected', null)
    },
    select: ({commit}, payload) => {
        commit('selected', payload)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}