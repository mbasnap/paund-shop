import { db, reestr } from '@/db'
const { get, post } = db('/reestr')
const state = {
    reestr: {}
}
const getters = {

    date({}, {}, { common }) {        
        return  common.date
    },
    docs({ reestr }) {        
        const rows = reestr.rows || []
        return  rows.map(v => v.doc)
    },
    map({}, { docs }) {
        return docs.reduce((obj, v) => ({ ...obj, [v._id]: v }), {})
    },
    values({}, { docs }) { 
        return  docs.filter(({ values }) => values && values.map)
            .reduce((arr, { values, _id, date }) => {
                const items = (values || []).map(v => ({ ...v, _id, date }))
                return [ ...arr, ...items ]
            }, [])
    },
    dt001({}, { values }){
        return values.filter(v => v.dt === '001')
            .reduce((cur, v) => ({ ...cur, [v._id]: v }), {})
    },
    ctOO1({}, { values, dtOO1 }){
        return values.filter(v => v.ct === '001')
            .reduce((cur, { _id, ref, klient, passport }) =>
                ({ ...cur, [_id]: { ...dtOO1[ref], klient, passport } }), {})
    },
    dt002({}, { values }){        
        return values.filter(v => v.dt === '002')
            .reduce((cur, v) => ({ ...cur, [v._id]: v }), {})
    },
    ct002({}, { values }){
        return values.filter(v => v.ct === '002')
            .reduce((cur, v) => ({ ...cur, [v._id]: v }), {})
    },
    dt301({}, { values }){
        return values.filter(v => v.dt === '301')
    },
    ct301({}, { values }){
        return values.filter(v => v.ct === '301')
    },
    bilets({}, { dt001, ct001 }) {
        return { ...dt001 , ...ct001 }
    },
    orders({}, { dt002, ct002 }) {
        return { ...dt002 , ...ct002 }
    },
    nextOrder({}, { dt002, ct002 }) {
        const number = v => (Math.max( ...v, 0) + 1)
        const dt = Object.values({ ...dt002 }).map(v => v.number || 0)
        const ct = Object.values({ ...ct002 }).map(v => v.number || 0)
        return { dt: number(dt) , ct: number(ct) }
    },
    nextNumber({}, { dt001 }) {
        const numbers = Object.values({ ...dt001 }).map(v => v.number || 0)
        return (Math.max( ...numbers, 0) + 1)
    },
    used({}, { ct001 }) {
        return Object.values({ ...ct001 }).reduce((obj, v) =>
            ({...obj, [v._id]: v }), {})
            
    },
    empty({}, { dt001, used }) {
        return Object.values({ ...dt001 }).filter(({ _id }) => !used[_id])
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
        console.log({ used: err });
    },
    async save ({ dispatch, getters }, v) {
        const date = getters['date']
        return dispatch('update', await reestr.post({ ...v, date }))
    },

    async remove ({ dispatch, getters }, { _id }) {     
        const used = getters.used[_id]
        if(used) throw { used }
        const doc = await reestr.get(_id)
        return dispatch('update', await reestr.remove(doc))
    },

    async update({ commit, getters }, { id } = {}) {
        commit('reestr', await reestr.allDocs({ include_docs: true }))
        return getters.map[id]
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}