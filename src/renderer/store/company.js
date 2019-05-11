import DataBase from '@/db'
import decode from 'jwt-decode'
const name = 'company'
const { post, setToken } = new DataBase(name)
const state = {
    company: {},
}
const getters = {
    company ({company}) {
        return company
    }
}
const mutations = {
    company (state, v) {
        state.company = v
    }
}
const actions = {
    setCompany ({ commit }, token) {
        setToken(name + '_token', token)
        // return commit('company', token ? decode(token) : {})
    },
    updateFromToken: ({ dispatch, getters }) => 
        dispatch('setCompany', localStorage.getItem(name + '_token')),
    // set ({commit, dispatch}, v) {},
    // save ({commit, dispatch}) {},
    // clear ({commit, dispatch}) {},
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}