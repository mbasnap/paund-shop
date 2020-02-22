import { user } from '@/db'
import { router } from '@/setup'
const state = {
    users: []
}
const getters = {
    users ({ user }) {
        return { ...user }
    }
}
const mutations = {
    users (state, v) {
        state.users = v
    }
}
const actions = {


    async update  ({commit}) {
        commit('user', localStorage.getItem('user'))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}