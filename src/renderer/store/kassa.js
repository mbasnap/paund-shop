import DataBase from '@/db'
const { get, post } = new DataBase('kassa')

const state = {
    ok: 2235.20,
    debet: [200, 3000.25, 2520.45, 450015.45, 750325.45, 457454.25, 200, 3000.25, 2520.45, 450015.45, 750325.45, 457454.25],
    kredit: [300, 200, 3000.25, 2520.45, 450015.45, 750325.45, 457454.25, 200, 3000.25,],
    minRows: [],
}
const getters = {
    ok: ({ok}) =>  ok,
    debet: ({debet}) => debet,
    kredit: ({kredit}) => kredit,
    rowsLength: ({debet, kredit}) => {
        const minLength = 50
        const rowsLength = debet.length > kredit.length ? debet.length : kredit.length
         return minLength > rowsLength ? minLength : rowsLength
    },
    debetSumm({debet}) {
        return debet.reduce((summ, item) => {
            return summ + item
        }, 0)
    },
    kreditSumm({kredit}) {
        return kredit.reduce((summ, item) => {
            return summ + item
        }, 0)
    },
    ok_end: ({}, getters) => {

        return  getters.ok + getters.debetSumm - getters.kreditSumm
    },
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
}

export default {
    state,
    getters,
    mutations,
    actions
}