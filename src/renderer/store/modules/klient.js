import DataBase from '@/db'
// import decode from 'jwt-decode'
const { get, post } = new DataBase('klients')

const state = {
    // edit: [],
    klient: {},
    klients: []
}
const getters = {
    klients: ({klients}) => klients,
    klient: ({klient}) => klient,
    // saved: ({edit}) => !edit.length > 0,
    // editIndex: ({edit}) => name => edit.findIndex(item => item.name === name),
    // editToObj: ({edit}) => edit.reduce((obj, {name, value}) => {
    //     obj[name] = value
    //     return obj
    // }, {})
}
const mutations = {
    klients(state, payload) {
       state.klients = payload 
    },
    klient: (state, payload) => {
        state.klient = payload
        // state.edit = []
    },
    // addEdit: ({edit}, payload) => edit.push(payload),
    // setEdit: ({edit}, {index, value}) => edit[index].value = value,
    // removeEdit: ({edit}, index) => edit.splice(index, 1),
    // changeSelected: ({selected}, {name, value}) => selected[name] = value
}
const actions = {
    initKlients({commit}) {
        get().then(res => {
            commit('klients', res)
        })
    },
    saveKlient({commit, getters}) {
        // const klient = getters.klient
        post('/', getters.klient).then(res => {

           commit('klients', [...getters.klients, res])
        })
    },
    setKlient: ({commit}, payload) => {
        commit('klient', payload)
    },   
    // edit: ({commit, getters, dispatch}, {name, value}) => {
    //      let index = getters.editIndex(name)
    //      index === -1 ? commit('addEdit', {name, value}) : dispatch('setEdit', {index, value})
    // },
    // setEdit: ({commit}, {index, value}) => value ? commit('setEdit', {index, value}) : commit('removeEdit', index),

    // change: ({state, commit}, payload) => commit('selected', {...(state.selected), ...payload}),
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}