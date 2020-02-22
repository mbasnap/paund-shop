import { company, user } from '@/db'
import { router } from '@/setup'

const state = {
    date: new Date(),
    company: {},
    user: false
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
    user({ user }) {
        return user || ''
    },
    date ({ date }) {
        return date
    },
    menu ({}, { company }) {
        return company.menu || []
    }
}
const mutations = {
    date (state, v) {
        state.date = v
    },
    company (state, v) {        
        state.company = v
    },
    user (state, v) {        
        state.user = v
    }
}
const actions = {
    logIn({ dispatch }, { email, password }) {
        return user.logIn(email, password)
            .then(() => {
                localStorage.setItem('user', email)
                dispatch('update')
            })
    },
    logOut({ dispatch }) {
        user.logOut().then(() => {
            localStorage.removeItem('user')
            dispatch('update')
        })        
    },

    setDate  ({ commit }, v) {
        commit('date', v)
    },
    async update  ({ commit }, path = '/vidacha') {
        const user = localStorage.getItem('user')
        commit('user', user)
        commit('company', await company.allDocs({include_docs: true}))
        router.push(user ? path : '/login')
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}