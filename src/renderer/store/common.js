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
        return {...rows[0]}.doc || {}
    },
    settings ({}, { company }) {
        return { ...company.settings }
    },
    user({ user }, { 'klient/docs': klients}) {
        if (user === 'admin') return { email: user }
        return klients.find(({ email }) => email === user )
    },
    users({}, { company }) {
        return company.users || []
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
    save ({ dispatch, getters }, v) {
        return company.post({ ...getters['company'], ...v })
            .then(v => dispatch('update'))
    },
    addUser({ dispatch, getters }, { email, _id }) {
        const users = [ ...getters['users'], _id]
        return user.signUp(email, '1234', { roles: ['user']})
            .then(() => dispatch('save', { users }))
                .catch(({ docId }) => dispatch('removeUser', { docId, _id }))
    },
    removeUser({ dispatch, getters }, { docId, _id }) {
        const users = getters['users'].filter(v => v !== _id)
        return user.get(docId).then(v => user.put({ ...v, _deleted: true }))
            .then(() => dispatch('save', { users }))
    },
    async logIn({ dispatch }, { email, password }) {
        await user.logIn(email, password)
        localStorage.setItem('user', email)
        dispatch('update')
    },
    async logOut({ dispatch }) {
        await user.logOut()
        localStorage.removeItem('user')
        dispatch('update')      
    },
    setDate  ({ commit }, v) {
        commit('date', v)
    },
    async update  ({ commit }, user = localStorage.getItem('user')) {
        commit('user', user)
        commit('company', await company.allDocs({include_docs: true}))
        router.push(user ? '/vidacha' : '/login')
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}