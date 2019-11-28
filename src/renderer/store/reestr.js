import moment from 'moment'
import { db } from '@/db'
const f = date => moment.utc(date).format('DD/MM/YYYY')
const { get, post } = db('/reestr')
const state = {
    reestr: []
}
const getters = {
    byDate ({ reestr }, {}, { common }) {
        return reestr.filter(({ date }) =>
            f(date) === f(common.date))
    }
}
const mutations = {
    reestr (state, v) {
        state.reestr = v
    }
}
const actions = {

    async ssuda ({ dispatch }, { _id, number,  ssuda, procent }) {
        const values = [
            { dt: '001',  number },
            { dt: '377', ct: '301', summ: ssuda },
            { dt: '301', ct: '703', summ: procent }  
        ]
        return dispatch('save', { ref: 'bilet', ref_id: _id, values })
    },

    async vozvrat ({ dispatch }, bilet) {
        const { number, ocenca, ssuda, procent, penalty } = bilet
        return dispatch('save', [ bilet,
            { ct: '001', ...ocenca, number },
            { dt: '301', ct: '377', summ: ssuda },
            { dt: '301', ct: '703', summ: procent },      
            { dt: '301', ct: '704', summ: penalty }   
        ])
    },

    async save ({ dispatch }, v) {
        await post('/', v)
        return dispatch('update')
    },

    async remove ({ dispatch }, v) {
        await post('/remove', v)
        return dispatch('update')
    },

    async update({ commit }) {
        return commit('reestr', await get('/'))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}