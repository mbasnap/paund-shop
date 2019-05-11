import { inherits } from 'util';

const { remote } = require ('electron');
const path = require ('path');
const defaultMainPath = path.dirname (remote.app.getPath ('exe'))

const state = {
    settings: {
        logo: "Logo"
    }
}
const getters = {
    settings: state => state.settings
}
const mutations = {
    changeSettings: (state, payload) => state.settings = payload
}
const actions = {
    saveSettings: ({commit}, payload) => commit('changeSettings', payload),
    // init ({dispatch}) {
    //     dispatch('setUser', localStorage.getItem('jwtToken'))
    // }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}