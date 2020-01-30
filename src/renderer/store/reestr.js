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
    dt377({}, { values }){     
        return values.filter(v => v.dt === '377')
    },
    ct377({}, { values }){
        return values.filter(v => v.ct === '377')
    },
    dt301({}, { values }){
        return values.filter(v => v.dt === '301')
    },
    ct301({}, { values }){
        return values.filter(v => v.ct === '301')
    },
    bilets({}, { dt001, ct001 }) {
        return { ...dt001, ...ct001  }
    },
    dt200({}, { values }){
        return values.filter(v => v.dt === '200')
    },
    nextOrder({}, { dt301, ct301, map }) {
        const number = v => (Math.max( ...v, 0) + 1)
        const dt = dt301.map(v => map[v._id]).map(v => ({...v.order}.dt || 0))
        const ct = ct301.map(v => map[v._id]).map(v=> ({...v.order}.ct || 0))
        return { dt: number(dt) , ct: number(ct) }
    },
    // nextNumber({}, { dt377, map }) {
    //     const numbers = dt377.map(v => map[v._id]).map(v => v.number || 0)
    //     return (Math.max( ...numbers, 0) + 1)
    // },
    numbers({}, { dt377, map }) {
        const arr = dt377.map(v => ({...map[v._id]})).map(v => v.number || 0)        
        const [min,max] = [Math.min(...arr), Math.max(...arr)]
        const numbers = Number.isFinite(max - min) ? max - min : 0       
        const res = Array.from(Array(numbers), (v,i) => i + min)
            .filter(i=>!arr.includes(i))
        return [...res, max + 1]
    },
    used({}, { ct377, map }) {
        return ct377.map(v => map[v._id]).reduce((obj, v) => ({...obj, [v.ref]: v }), {})
    },
    empty({}, { dt377, used }) {
        return dt377.filter(({ _id }) => !used[_id])
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