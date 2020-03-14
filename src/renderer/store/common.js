import { get, post, jwtDecode, login, loginAdmin, bcrypt } from '@/db'
import { router } from '@/setup'
const reduceBy = (key, arr) => arr.reduce((cur, v) => ({...cur, [v[key]]: v }), {})
const state = {
    date: new Date(),
    company: {},
    users: []
}

const getters = {
    company ({ company }) {
        return company
    },
    users({ users }) {
        return users
        // .filter(({ _id }) => _id.includes('org.couchdb.user'))
    },
    usersMap({}, { users }) {
        return reduceBy('name', users)
    },
    lombard({}, { company }) {
        return {...company.lombard }
    },
    user({}, { company, usersMap }) {
        const { name } = {...company.user }
        return {...usersMap[name] }
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
    }
}
const actions = {
    async activate({}, { password, token }) {
        loginAdmin(password)
        localStorage.setItem('settings', JSON.stringify(jwtDecode(token)))
        window.location.reload()
    },
    changeAccount({}) {
        localStorage.removeItem('settings')
        window.location.reload()
    },
    async updateUser({ dispatch }, { user, password } ) {
        if (password) user.password = await bcrypt.hash(password, 10)
        return post('users', user).then(() => dispatch('update'))
    },

    async logIn({ dispatch }, { user, password }) {
        const mached = await bcrypt.compare(password, user.password)
        if (!mached)  throw 'invalid_password'
        else dispatch('setUser', user)
    },
    setUser({ dispatch }, v) {
        localStorage.setItem('user', JSON.stringify(v))
        dispatch('update', 'vidacha')
    },
    async logOut({ dispatch }) {
        localStorage.removeItem('user')
        dispatch('update', 'login')
    },
    setDate  ({ commit }, v) {
        commit('date', v)
    },
    async update ({ commit }, path) {
        console.log('update');
        
        const { lombard } = JSON.parse(localStorage.getItem('settings')) || {}
        const user = JSON.parse(localStorage.getItem('user'))
        commit('company', { ...await get('company', lombard) , lombard, user })
        commit('users', await get('users'))
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