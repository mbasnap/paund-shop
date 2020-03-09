import { get, post } from '@/db'
const state = {
    reestr: []
}
const getters = {
    docs({ reestr }) {        
        return  reestr || []
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
    dt200({}, { values }){
        return values.filter(v => v.dt === '200')
    },
    nextOrder({}, { dt301, ct301, map }) {
        const number = v => (Math.max( ...v, 0) + 1)
        const dt = dt301.map(v => map[v._id]).map(v => ({...v.order}.dt || 0))
        const ct = ct301.map(v => map[v._id]).map(v=> ({...v.order}.ct || 0))
        return { dt: number(dt) , ct: number(ct) }
    },
    numbers({}, { dt377, map }, {}, { company }) {      
        const fin = v => Number.isFinite(v) ? v : 0
        const arr = dt377.map(v => ({...map[v._id]}))
            .map(v => Number(v.number)).filter(v => !!v)
        const min = Number(company.number) || 1
        const max = fin(Math.max(...arr))
        const count = max - min > 0 ? max - min : 1
        const res = Array.from(Array(count), (v,i) => i + min)
            .filter(i => !arr.includes(i))
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
    save ({ dispatch }, v) {
        console.log(v);
        
        const {  date, lombard } = this.getters
        return post('reestr', { date, ...v, lombard, type: 'reestr'  })
            .then(v => dispatch('update', v))
    },
    remove ({ dispatch }, { _id }) {     
        return get('reestr', _id)
            .then(v => dispatch('save', { ...v, _deleted: true }))
                .then(v => dispatch('update', v))
    },

    async update({ commit, getters }, v) {
        commit('reestr', await get('reestr'))
        return getters.map[{ ...v}.id]
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}