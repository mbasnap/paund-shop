import { db, getToken } from '@/db'
import { router } from '@/setup'
// import { toDouble }  from '@/functions'

const { get } = db()
const state = {
    date: new Date(),
    menu: [ "vidacha", "vozvrat", "sklad"],
    company: {}
}

const getters = {
    company ({ company }) {        
        return { ...company }
    },
    settings ({ }, { company }) {
        return { ...company.settings }
    },
    accounts ({ }, { settings }) {
        return { ...settings.accounts }
    },
    discounts ({ }, { settings }) {
        return settings.discounts || []
    },
    user({}, getters) {
        return getters['user/user']
    },
    isAuth ({}, getters) {
        return getters['user/isAuth']
    },
    isActive ({ company }) {
        return !! company.id
    },
    date ({ date }) {
        return date
    },
    menu ({ menu }) {
        return menu
    },
    logo ({ company }) {
        return company.name
    }

}
const mutations = {
    date (state, v) {
        state.date = v
    },
    company (state, v) {
        state.company = { ...v }
    }
}
const actions = {

    async activate({ dispatch }, token) {
        localStorage.setItem('x-token', token)
        await dispatch('update')
        router.push('/login')
    },

    setDate  ({ commit }, v) {
        commit('date', v)
    },

    async update  ({ commit, dispatch }) {
        getToken('x-token')
        commit('company', await get('/'))
        dispatch('reestr/update')
        dispatch('klient/update')
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}