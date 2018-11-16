

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
    selected: (state, payload) => {
        state.selected = payload
        state.edit = []
    },
    editAdd: ({edit}, {name, value}) => {
        let  index = edit.findIndex(item => item.name === name), setValue = v => edit[index].value = v
        !(index == -1) ? setValue(value): edit.push({name, value})
    },
    editRemove: ({edit}, name) => {
        if(edit[name]) delete edit[name]
    }
}
const actions = {
    clear: ({commit}) => commit('selected', null),
    editAdd: ({commit}, payload) => {
        let {name, value} = payload
        if (value) commit('editAdd', payload)
        
    },
    editRemove: ({commit}, payload) => commit('editRemove', payload),
    select: ({commit}, payload) => commit('selected', payload),
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}