import { range  } from '@/functions'
import { get, post } from '@/functions/db'
const state = {}
const getters = {
  docs({}, {}, { common }) {
    return  common.reestr || []
  },
  map({}, { docs }) {
    return docs.reduce((obj, v) => ({ ...obj, [v._id]: v }), {})
  },
  values({}, { docs }) { 
    return  docs.filter(({ values }) => values && values.map)
      .reduce((arr, { values, _id, date, deleted }) => {
        const items = (values || []).map(v => ({ ...v, _id, date, deleted }))
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
  numbers({}, { dt377, map }) {
    const res =  dt377.filter(v => !v.deleted )
      .map(v => map[v._id].number + '')
    return res
  },
  emptyNumbers({}, { numbers }, { common }) {
    const number = common.company && Number(common.company.number || 0)
    if (!number) return []
    const res = range(number, number + numbers.length)
    .filter(v => {
      return !numbers.includes(v + '')
    })
    return res
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
    console.error({ used: err });
  },
  save ({ dispatch }, v) {
    const {  date, user } = this.getters
    return post('reestr', { date, ...v, user: user._id, type: 'reestr' })
      .then(v => dispatch('update', v))
  },
  remove ({ dispatch }, { _id, deleted }) {
    const _deleted =  deleted === 'remove' && this.getters.isAdmin
    return get('reestr', _id).then(v => dispatch('save', { ...v, deleted: deleted || undefined, _deleted }))
  },
  async update({ getters }, { id }) {
    await this.dispatch('update')
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