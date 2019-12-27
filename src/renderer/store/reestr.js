import { db } from '@/db'
const { get, post } = db('/reestr')
const state = {
    reestr: []
}
const getters = {

    values({ reestr }) {        
        return reestr
    },
    dt001({ reestr }) {
        return reestr.filter(v => v.dt === '001')
    },
    ct001({ reestr }) {      
        return reestr.filter(v => v.ct === '001')
    },
    used({}, { ct001 }) {        
        return ct001.reduce((cur, { bilet }) => { return { ...cur, [bilet._id]: bilet }}, {})
    },
    empty({}, { dt001, used }) {
        return dt001.filter(({ _id }) => !used[_id])
            .reduce((cur, v) => { return { ...cur, [v._id]: v } }, {})
    }
}
const mutations = {
    reestr (state, v) {
        state.reestr = v
    }
}
const actions = {

    async save ({ dispatch }, values) {     
       const _id =  await post('/', { values })
        return dispatch('update', _id)
    },

    async remove ({ dispatch }, _id) {
        await post('/remove', { _id })
        return dispatch('update')
    },

    async update({ commit }, v) {
        commit('reestr', await get('/'))
        return v
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}