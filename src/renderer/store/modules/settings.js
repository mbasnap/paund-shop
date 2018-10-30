const { remote } = require ('electron');
const path = require ('path');
const defaultMainPath = path.dirname (remote.app.getPath ('exe'))

const state = {
    settings: {
        logoText: 'Logo'
    }
}
const getters = {
    get: (item)=>{
        let res = state.settings
        // if(item) res = res[item]
        return res
    }
}
const mutations = {
    settings( state, payload){
        state.settings = payload
    }
}
const actions = {
    save ({commit}, data){
        commit('settings', data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}