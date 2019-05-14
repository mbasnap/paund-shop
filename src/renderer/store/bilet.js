import DataBase from '@/db'
const { get, post} = new DataBase('company')

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
    save({commit, dispatch}) {
        post('/').then(res => console.log(res))
            .catch(err => console.log(err))
    },
    clear ({commit}) {
        commit('bilet', {})
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}