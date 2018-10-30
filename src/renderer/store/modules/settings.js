const { remote } = require ('electron');
const path = require ('path');
const defaultMainPath = path.dirname (remote.app.getPath ('exe'))

const state = {
    settings: {
<<<<<<< HEAD
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
=======
        logo: "Logo"
    }
}
const getters = {
    settings: state => state.settings
}
const mutations = {
    settings: (state, payload) => state.settings = payload
}
const actions = {
    save: ({commit}, payload) => commit('settings', payload)
>>>>>>> 145846c28cbd3d758a0a6c5140c354fd4bef56ff
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}