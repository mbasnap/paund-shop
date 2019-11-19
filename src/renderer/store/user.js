import { db, getToken } from '@/db'
import { router } from '@/setup'
const { get, post } = db()
const state = {
    user: {}
}
const getters = {
    user ({user}) {
        return user || {}
    },
    isAuth ({user}) {
        return !!user.id
    }


}
const mutations = {

    user (state, v) {
        state.user = v || {}
    }
}
const actions = {

    async login ({dispatch}, v) {
        const token = await post('/login', v)
        localStorage.setItem('x-user', token)
        await dispatch('update')
        router.push('/vidacha')
    },
    async logout () {
        localStorage.removeItem('x-user')
        router.push('/login')
    },
    async update  ({commit}) {
        getToken('x-user')
        commit('user', await get('/user/'))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}