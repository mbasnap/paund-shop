import { db } from '@/db'
const { get, post} = db('/klient')

const state = {
    selected: {},
    fields: {},
    klients: [],
}
const getters = {

    klients ({ klients }) {
        return [ ...klients]
    },

    klient ({selected, fields}) {
        return {...selected, ...fields}
    },

    isSelected ({selected}) {
        return !!Object.keys(selected).length
    },

    isEdit ({}, {edit}) {
        return !!Object.keys(edit).length
    },

    edit ({fields, selected}) {
        const edit = (v, [name, value]) => {
            return selected[name] !== value ? {...v, [name]: value} : v
        }
        return  Object.entries(fields).reduce(edit, {})
    }
}
const mutations = {

    klients (state, v) {
        return state.klients = v || []
    },

    selected (state, v) {
        return state.selected = v || {}
    },

    fields (state, v) {
       return state.fields = v || {}
    }
}
const actions = {
    
    async save ({ dispatch, getters }) {
        const { klient } = getters
        const id = await post('/', klient)
        return dispatch('update', { ...klient, id })
    },
    
    async select ({commit}, v) {
        commit('fields', {})
        commit('selected', v)
        return v
    },

    async set ({state, commit}, v) {
        commit('fields', {...state.fields, ...v})
    },

    async clear ({dispatch}) {
        dispatch('select', false)
    },

    async update ({commit, dispatch}, v) {
        commit('klients', await get('/'))
        return dispatch('select', v)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}