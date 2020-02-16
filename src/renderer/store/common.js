import { getToken, company } from '@/db'
import { router } from '@/setup'

const state = {
    date: new Date(),
    company: {}
}

const getters = {
    company ({ company }) {    
        const rows = company.rows || []
        return rows.reduce((obj, { doc }) => ({ ...obj, ...doc }), {})
    },
    settings ({}, { company }) {
        return { ...company.settings }
    },
    accounts ({}, { settings }) {
        return { ...settings.accounts }
    },
    discounts ({}, { settings }) {
        return settings.discounts || []
    },
    user({}, getters) {
        return getters['user/user']
    },
    isAuth ({}, getters) {
        return true
        // return getters['user/isAuth']
    },
    isActive ({}, { company }) {
        return !! company.id
    },
    date ({ date }) {
        return date
    },
    menu ({}, { company }) {
        return company.menu || []
    },
    logo ({}, { company }) {
        return company.name
    }

}
const mutations = {
    date (state, v) {
        state.date = v
    },
    company (state, v) {
        console.log(v);
        
        state.company = v
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
        // getToken('x-token')
        commit('company', await company.allDocs({include_docs: true}))
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