import { get, post } from '@/db'

const state = {
    // klients: [],
}
const getters = {
    docs({}, {}, { common }) {
        return  common.klients || []
    },
    map ({}, { docs }) {
        return  docs.reduce((obj, v) => ({ ...obj, [v._id]: v}), {})
    },
    group({}, { docs }) {
        return docs.reduce((cur, v) => {
            const id =  ('' + v.family + v.name + v.sername).toLowerCase()
            return {...cur, [id]: [...(cur[id] || []), v]}
        }, {})
    }
}
const mutations = {
    klients (state, v) {
        state.klients = v
    }
}
const actions = {
    async save ({ dispatch }, v) {
        const {  lombard } = this.getters
        return post('klients', { lombard, ...v, type: 'klient' })
            .then(v => dispatch('update', v))
    },
    async remove ({ dispatch }, v) {
        return get('klients', v._id)
            .then(v => dispatch('save', {...v, _deleted: true }))
    },
    async update ({ commit, getters }, v) {       
        // commit('klients', await get('klients'))
        await this.dispatch('update')
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