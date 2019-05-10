import DataBase from '@/db'
const { post, setAuthToken } = new DataBase('klient')

const state = {
    bilets: [],
    bilet: {},
}
const getters = {
    bilet ({bilet}) {
        return bilet
    },

    bilets ({bilets}) {
        return bilets
    }
}
const mutations = {

    bilet (state, v) {
        state.bilet = v
    }
}
const actions = {
    saveBilet ({commit, dispatch}) {
        dispatch('klient/save').then(id => {
            console.log(id)
        })
    },
    clearAll ({commit, dispatch}, v) {
        commit('bilet', {})
        dispatch('obespechenie/clear')
    },
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}