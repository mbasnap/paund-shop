import { db, getToken } from '@/db'
import {router} from '@/setup'
import {toDouble, procent, summ} from '@/functions'
const {get, post} = db()
const state = {
    date: new Date(),
    logo: 'PS',
    menu: [ "vidacha", "vozvrat", "sklad"],
    company: {},
    bilet: {},
    props: {},
    ocenka: null
}

const getters = {
    bilet ({bilet}) {
        return {...bilet}
    },
    ocenka ({ocenka}) {
        return toDouble(ocenka)
    },
    isAuth (state, getters) {
        return getters['user/isAuth']
    },

    isActive ({company}) {
        return !! company.id
    },

    date ({date}) {
        return date
    },

    emptyNumbers () {
        return [1, 2, 3]
    },

    minDays ({props}) {
        return props.minDays || '1'
    },

    maxDays ({props}) {
        return props.maxDays || '31'
    },

    discounts ({props}) {
        return props.discounts || [10, 15, 20]
    },

    menu ({menu}) {
        return menu
    },

    logo ({company, logo}) {
        return company.name || logo
    }

}
const mutations = {
    date (state, v) {
        state.date = v
    },
    company (state, v) {
        state.company = v || {}
    }
}
const actions = {
    
    async activate({dispatch}, token) {
        localStorage.setItem('x-token', token)
        await dispatch('update')
        router.push('/login')
    },

    async update  ({commit, dispatch}) {
        getToken('x-token')
        commit('company', await get('/'))
        dispatch('user/update')
        dispatch('klient/update')
        dispatch('bilet/update')
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}