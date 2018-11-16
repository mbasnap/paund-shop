let  getSame = name => edit.findIndex(x => {
    return x === name
})

const state = {
    edit: [],
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
    getSelected: ({selected}) => selected || {},
    isSaved: ({edit}) => !edit.length > 0
}
const mutations = {
    selected: (state, payload) => state.selected = payload,
    editAdd: ({edit}, name) => {

        if (!getSame(name))  edit.push(name)
    },
    editDelete: ({edit}, name) => {
        let index = getSame(name)
    },
    editClear: (state) => state.edit = [],
}
const actions = {
    clear: ({commit}) => {
        commit('editClear')
        commit('selected', null)
    },
    edit: ({commit}, {name, newV}) => {
        newV ? commit('editAdd', name ) : commit('editDelete', name )
    },
    select: ({commit}, payload) => {
        commit('editClear')
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