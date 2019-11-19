import { db } from '@/db'
const { get, post} = db('/reestr')
const state = {
    reestr: [],
}
const getters = {
    kassa ({ reestr }) {
        const kassa = acc => v => v[acc] === '301'
        const dt = reestr.filter(kassa('dt'))
        const ct = reestr.filter(kassa('ct'))
        return { dt, ct }
    }
}
const mutations = {
    reestr (state, v) {
        state.reestr = v
    }
}
const actions = {


    async ssuda ({ dispatch }, { id, ssuda, procent }) {
        const value = [
            { dt: '001', ref: 'bilet', ref_id: id },
            { dt: '377', ct: '301', ...ssuda },
            { dt: '301', ct: '703', ...procent }    
        ]
        return dispatch('save', { name: 'vidana ssuda', value })
    },

    async vozvrat ({ dispatch }, v) {
        const { id, ssuda, procent, penalty } = v
        return dispatch('save', [
            { ct: '001', ref: 'bilet', id  },
            { dt: '301', ct: '377', ...ssuda },
            { dt: '301', ct: '703', ...procent },      
            { dt: '301', ct: '704', ...penalty }   
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