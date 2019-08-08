import { db } from '@/db'
const { get, post} = db('/bilet')

const state = {
    bilet: {},
    bilets: [],
}
const getters = {
    
    bilets ({bilets}) {
        return [...bilets]
    },
    discounts ({bilets}) {
        return [10, 15, 20]
    },
    minDays ({}) {
        return '1'
    },

    maxDays ({}) {
        return '31'
    },

    discounts ({}) {
        return ['10', '15', '20']
    },

    empty ({}, {bilets}) {
        // return bilets.filter(o => !!o.date)
    },
    emptyNumbers ({}, {bilets}) {
        return ['1', '2', '3']
    },
    // date ({}, {date}) {
    //     return date
    // },

    bilet ({bilet}) {
        return {...bilet}
    },

    // emptyNumbers ({}, {bilets}) {
    //     const {seria} = settings
    //     return bilets.reduce(({number: prev}, {number}) =>
    //         prev < number ? prev : number, 1)
    // }
}
const mutations = {

    bilets (state, v) {
        state.bilets = v || []
    },

    bilet (state, v) {
        state.bilet = v || {}
    }
}
const actions = {

    async save ({dispatch}, bilet) {
        const id = await post('/', bilet)
        return dispatch('update', {...bilet, id})
    },

    async select ({commit}, v) {
        commit('bilet', v)
        return v
    },

    async clear({ dispatch }) {
        dispatch('select', false)
    },

    async update({ commit, dispatch }, v) {
        commit('bilets', await get('/'))
        return dispatch('select', v)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}