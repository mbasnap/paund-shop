import { db, getToken, user } from '@/db'
import { router } from '@/setup'
const { get, post } = db()
const state = {
    user: {},
    users: {
        'Гаврищук': {

        },
        'Садовниченко': {

        }
    }
}
const getters = {
    user ({ user }) {
        return { ...user }
    },
    isAuth ({ user }) {
        return !!user.id
    }
}
const mutations = {
    user (state, v) {
        state.user = { ...v}
    }
}
const actions = {

    async login ({dispatch}, v) {
        const { email, password } = v
        user.signUp(v.email, v.password)
            .then(v => console.log(v))
            .catch(err => console.log(err))

        // const token = await post('/login', v)
        localStorage.setItem('x-user1', token)
        await dispatch('update')
        router.push('/vidacha')
    },
    async logout () {
        localStorage.removeItem('x-user')
        router.push('/login')
    },
    async update  ({commit}) {
        // getToken('x-user')
        // commit('user', await get('/user/'))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}