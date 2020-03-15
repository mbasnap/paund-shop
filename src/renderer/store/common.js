import { lombard, get, post, verify, sign, testAuth, hash, compare } from '@/db'
import { router } from '@/setup'

const reduceBy = (key, arr) => arr.reduce((cur, v) => ({...cur, [v[key]]: v }), {})
const state = {
    date: new Date(),
    company: {},
    users: [],
    klients: [],
    reestr: [],
}

const getters = {
    company ({ company }) {
        return company
    },
    users({ users }) {
        return users
    },
    usersMap({}, { users }) {
        return reduceBy('name', users)
    },
    lombard({}, { company }) {
        return {...company.lombard }
    },
    user({}, { company, usersMap }) {
        return {...usersMap[company.user] }
    },
    isAdmin({}, { user }) {
        return (user.roles || []).includes('admin')
    },
    date ({ date }) {
        return date
    }
}
const mutations = {
    date (state, v) {
        state.date = v
    },
    company (state, v) {    
        state.company = v
    },
    users (state, v) { 
        state.users = v
    },
    klients (state, v) { 
        state.klients = v
    },
    reestr (state, v) { 
        state.reestr = v
    }
}
const actions = {
    activate({}, token) {
        localStorage.setItem('settings', sign(verify(token, false), '1y'))        
        window.location.reload()
    },
    changeAccount({}) {
        localStorage.removeItem('settings')
        window.location.reload()
    },
    loginAdmin({}, password) {
        return testAuth(password).then(() => {
            localStorage.setItem('admin', password)
        })
    },
    async updateUser({ dispatch }, { password, user } ) {
        if (password) user.password = await hash(password)
        return post('users', user).then(() => dispatch('update'))
    },

    async logIn({ dispatch }, { password, user }) {
        // await compare(password, user)
        if (!await compare(password, user)) throw 'incorect_password'
        localStorage.setItem('user', sign({ _id: user._id }, '1h'))
        dispatch('update', 'vidacha')
    },
    logOut({ dispatch }) {
        localStorage.removeItem('user')
        dispatch('update', 'login')
    },
    setDate  ({ commit }, v) {
        commit('date', v)
    },
    async update ({ commit }, path) {
        console.log('update');
        const { _id: user } = verify(localStorage.getItem('user')) || {}
        commit('company', { ...await get('company', lombard), user })
        commit('users', await get('users'))
        commit('klients', await get('klients'))
        commit('reestr', await get('reestr'))
        if (path) router.push(path)
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}