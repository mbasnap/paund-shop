import { db } from '@/db'
const { get, post} = db('/reestr')
const debet = acc => ({dt}) => !!dt && dt === acc
const credit = acc => ({ct}) => !!ct && ct === acc
const state = {
    reestr: [],
}
const getters = {
    
    data ({reestr}) {
        return reestr.reduce((cur, val) => {
            const {id, data} = val
            return [...cur, ...data.map(item => {
                return {...item, id}
            })]
        }, [])
    },

    kassa ({}, {data}) {
        return {
            dt: data.filter(debet('301')),
            ct: data.filter(credit('301'))
        }
    }
}
const mutations = {

    reestr (state, v) {
        state.reestr = [...v]
    }
}
const actions = {
    async save ({dispatch}, data) {
        await post('/', {data})
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