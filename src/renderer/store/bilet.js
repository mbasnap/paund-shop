import DataBase from '@/db'
const { get, post, setHeadersToken } = new DataBase('lombard')

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
        setHeadersToken('@ds149706.mlab.com:49706/paundshop')
        // for (let i = 0; i < 10000; i++){
        //     console.log(i)
            get('/bilet').then(res => {
                console.log(res)
            })
        // }
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