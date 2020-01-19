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
    dt301({}, { values }){
        return values.filter(v => v.dt === '301')
    },
    ct301({}, { values }){
        return values.filter(v => v.ct === '301')
    },
    lastOrder({}, { dt301, ct301, map }) {
        const orderNumber = ({ order }) => ({ ...order }.number || 0)
        const dt = dt301.map(v => orderNumber({ ...map[v._id] }))
        const ct = ct301.map(v => orderNumber({ ...map[v._id] }))
        return { dt: Math.max( ...dt, 0) , ct: Math.max( ...ct, 0) }
    },
    nextNumber({}, { dt377, map }) {
        const numbers = dt377.map(v =>({...map[v._id]}.number || 0))
        return (Math.max( ...numbers, 0) + 1)
    },
    dt377({}, { values } ) {
        return values.filter(v => v.dt === '377')
    },
    ct377({}, { values } ) {
        return values.filter(v => v.ct === '377')
    },
    used({}, { ct377, map }) {
        const used = ({ ref }) => ({ [ref]: map[ref] })
            return ct377.reduce((obj, v) => ({...obj, ...used(map[v._id])}), {})
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
       const { id: _id } =  await reestr.post({ ...v, date })
       return dispatch('update', { ...v, _id })
    },

    async remove ({ dispatch, getters }, { _id }) {     
        const used = getters.used[_id]
        if(used) throw { used }
        const doc = await reestr.get(_id)
        await reestr.remove(doc)
        return dispatch('update')
    },

    async update({ commit }, v) {
        commit('reestr', await reestr.allDocs({ include_docs: true }))
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