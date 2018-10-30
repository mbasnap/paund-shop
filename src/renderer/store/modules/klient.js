const defaultKlient = {
    title: "Klient"
}

const state = {
    current: null
}
const getters = {
<<<<<<< HEAD
    get (state){
        return state
=======
    current: state => {
        let current = state.current
        return current ? current : defaultKlient
    },
    isSaved: state => {
        let current = state.current
        if (current && current.id) return true
>>>>>>> 145846c28cbd3d758a0a6c5140c354fd4bef56ff
    }
}
const mutations = {
    changeCurrent: (state, payload) => state.current = payload
}
const actions = {
<<<<<<< HEAD

=======
    setCurrent: ({commit}, payload) => commit('changeCurrent', payload),
    clearCurrent: ({commit}) => commit('changeCurrent', null),
    saveCurrent: ({state, commit}) => {
        let Klient = {title: 'name', id: 22}
        commit('changeCurrent', Klient)
    },
>>>>>>> 145846c28cbd3d758a0a6c5140c354fd4bef56ff
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}