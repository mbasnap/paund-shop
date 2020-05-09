import { lombard, get, post, setCompany, testAuth, hash, setUser } from '@/db'
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
        // return false
        return (user.roles || []).includes('admin')
    },
    date ({ date }) {
        return date
    },
    settings() {
        const order = JSON.parse(localStorage.getItem('order'))
        const bilet = JSON.parse(localStorage.getItem('bilet'))
        return {
            order: { zoom: "115%", silent: true, ...order },
            bilet: { zoom: "150%", silent: true, ...bilet }
        }
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
        setCompany(token)       
        window.location.reload()
    },
    changeAccount() {
        localStorage.removeItem('settings')
        window.location.reload()
    },
    loginAdmin({}, password) {
        return testAuth(password).then(() => {
            localStorage.setItem('admin', password)
        })
    },
    async updatePassword({ dispatch }, { user, password } ) {
        return post('users', {...user, password: await hash(password) })
            .then(() => dispatch('logOut'))
    },
    async updateUser({}, user ) {
        const { id, rev } = await post('users', user)
        return {...user, _id: id, _rev: rev }
    },
    async logIn({ dispatch }, { password, user }) {
        await setUser(user, password)
        dispatch('update', 'vidacha')
    },
    logOut({ dispatch }) {
        localStorage.removeItem('user')
        dispatch('update', 'login')
    },
    setDate  ({ commit }, v) {
        commit('date', v)
    },
    async update ({ commit, dispatch }, path) {
        console.log('update');
        
        const { _id: user } = await setUser(localStorage.getItem('user'))
        try {           
            commit('company', { ...await get('company', lombard), user })
            commit('users', await get('users'))
            commit('klients', await get('klients'))
            commit('reestr', await get('reestr'))
            if (path) router.push(path)
        } catch({ message }) {
            console.log(message);
            
            // if (message === 'Failed to fetch')
            // dispatch('changeAccount')
            // router.push('login')
            // else dispatch('changeAccount')
        }

        }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}