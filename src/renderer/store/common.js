import {router} from '@/setup'
import { setHeaders, decode }from '@/db'
const tokenName = 'x-lombard'

const state = {
    date: new Date(),
    logo: 'PS',
    menu: [ "vidacha", "vozvrat", "sklad"],
    company: {},
    err: '',
}
const getters = {

    isAuth ({company}, getters) {
        return !! getters['user/isAuth']
    },
    date ({date}) {
        return date
    },
    menu ({menu}) {
        return menu
    },
    logo ({company, logo}) {
        return company.name || logo
    },
    user (state, getters) {
        return getters['user/user']
    },
    err ({err}) {
        return err
    },
    url ({company}) {
        return company.url
    }

}
const mutations = {
    date (state, v) {
        state.date = v
    },
    company (state, v) {
        state.company = v
    }
}
const actions = {
    clear ({ dispatch }) {},
    setDate ({ commit }, v) {
        commit('date', v)          
    },
    
    activate({ dispatch }, token) {
        localStorage.setItem(tokenName, token)
        dispatch('update', '/login')   
    },

    update ({ commit }, path) {
        const token = localStorage.getItem(tokenName)
        setHeaders(tokenName, token)
        commit('company', decode(token))
        if (path) router.push(path)
    },   
    fetchToken () {
        return decode(localStorage.getItem(tokenName))
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}