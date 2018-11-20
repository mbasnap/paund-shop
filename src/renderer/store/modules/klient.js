

const state = {
    edit: [],
    selected: {},
    klients: [
        {id: 1, name: 'vasia', sername: 'vladimirivich', family: 'camoshkin'},
        {id: 2, name: 'vasia', sername: 'vladimirivich', family: 'ionov'},
        {id: 3, name: 'petia', sername: 'vladimirivich', family: 'melichov'},
        {id: 4, name: 'kolia', sername: 'vladimirivich', family: 'igrunev'},
    ]
}
const getters = {
    getAll: ({klients}) => klients,
    getSelected: ({selected}) => selected,
    saved: ({edit}) => !edit.length > 0,
    editIndex: ({edit}) => name => edit.findIndex(item => item.name === name),
    editToObj: ({edit}) => edit.reduce((obj, {name, value}) => {
        obj[name] = value
        return obj
    }, {})
}
const mutations = {
    selected: (state, payload) => {
        state.selected = payload
        state.edit = []
    },
    addEdit: ({edit}, payload) => edit.push(payload),
    setEdit: ({edit}, {index, value}) => edit[index].value = value,
    removeEdit: ({edit}, index) => edit.splice(index, 1),
    changeSelected: ({selected}, {name, value}) => selected[name] = value
}
const actions = {
    clear: ({commit}) => commit('selected', {}),
    edit: ({commit, getters, dispatch}, {name, value}) => {
         let index = getters.editIndex(name)
         index === -1 ? commit('addEdit', {name, value}) : dispatch('setEdit', {index, value})
    },
    setEdit: ({commit}, {index, value}) => value ? commit('setEdit', {index, value}) : commit('removeEdit', index),
    select: ({commit}, payload) => commit('selected', payload),
    set: ({state, commit}, payload) => {
        payload.id ? commit('selected', payload) : commit('selected', {...(state.selected), ...payload})
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}