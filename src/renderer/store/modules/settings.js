const { remote } = require ('electron');
const path = require ('path');
const defaultMainPath = path.dirname (remote.app.getPath ('exe'))

const state = {
    mainPath: null
}
const getters = {
    mainPath: state => {
        if (!state.mainPath) return defaultMainPath
    }
}
const mutations = {

}
const actions = {
    save ({commit}){
        console.log('saved')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}