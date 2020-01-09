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
            .reduce((cur, v) => ({ ...cur, [v._id]: v }), {})
    },
    dt002({ reestr }) {
        return reestr.filter(v => v.dt === '002')
            .reduce((cur, v) => ({ ...cur, [v._id]: v }), {})
    },
    ct002({ reestr }) {
        return reestr.filter(v => v.ct === '002')
            .reduce((cur, v) => ({ ...cur, [v._id]: v }), {})
    },
    ct001({ reestr }, { dt001 }) {   
        const used = (cur, { _id, ref }) => ({ ...cur, [_id]: dt001[ref]})     
        return reestr.filter(v => v.ct === '001').reduce(used, {})
    },
    used({}, { ct001 }) {
        return Object.values(ct001)
            .reduce((cur, v) => ({ ...cur, [v._id]: v }), {})
    },
    empty({}, { dt001, used }) {
        return Object.values(dt001).filter(({ _id }) => !used[_id])
            .reduce((cur, v) => ({ ...cur, [v._id]: v }), {})
    }
}
const mutations = {
    reestr (state, v) {
        state.reestr = v
    }
}
const actions = {
    err({}, err) {
        console.log(err);
    },
    async save ({ dispatch }, values) {
       const _id =  await post('/', { values })
        return dispatch('update', { _id, values })
    },

    async remove ({ dispatch, getters }, { _id }) {      
        const used = getters.used[_id]
        if(used) return dispatch('err', used)
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