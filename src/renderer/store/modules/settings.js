const { remote } = require ('electron');
const path = require ('path');
const defaultMainPath = path.dirname (remote.app.getPath ('exe'))

const state = {
    settings: {
<<<<<<< HEAD
        logo: "Logo"
    }
}
const getters = {
    settings: state => state.settings
=======
        logoText: 'logo'
    },
    mainPath: null
}
const getters = {
    getAll: (state) => {return state.settings},
    mainPath: state => {
        if (!state.mainPath) return defaultMainPath
    }
>>>>>>> 8f6d850bb5da6bb591a6562ec5352c432dd78ebd
}
const mutations = {
    settings: (state, payload) => state.settings = payload
}
const actions = {
    save: ({commit}, payload) => commit('settings', payload)
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}