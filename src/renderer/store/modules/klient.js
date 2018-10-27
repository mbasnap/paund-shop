

const state = {
    title: 'klient',
    current: null
}
const getters = {
    isSaved: state => {
        return true
    },
    title (state){
        return state.title
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