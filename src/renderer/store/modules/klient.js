

const state = {
    current: null,
    editStatus: false,
    klients: [
        {title: 'vasia', sername: 'vladimirivich', family: 'camoshkin'},
        {title: 'vasia', sername: 'vladimirivich', family: 'camoshkin'},
        {title: 'petia', sername: 'vladimirivich', family: 'camoshkin'},
        {title: 'kolia', sername: 'vladimirivich', family: 'camoshkin'},
    ]
}
const getters = {
    getAll: state => {
        return state.klients
    },
    getCurrent: state => {
        let current = state.current
        return current ? current : {}
    }
}
const mutations = {
    current: (state, payload) => state.current = payload,
    editStatus: (state, payload) => state.editStatus = payload,
}
const actions = {
    clear: ({commit}) => {
        commit('current', null)
        commit('editStatus', false)
    },
    save: ({dispatch, commit}, payload) => {
        commit('current', payload)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}