import { db, getToken } from '@/db'
import {router} from '@/setup'
import {toDouble, procent, summ} from '@/functions'
const { get, post } = db()
const state = {
    settings: {
        ok: 0,
        minRows: 5
    },
    date: new Date(),
    logo: 'PS',
    menu: [ "vidacha", "vozvrat", "sklad"],
    company: {},
    bilet: {},
    props: {},
    ocenka: null
}

const getters = {
    settings ({ settings }) {
        return settings
    },
    bilet ({bilet}) {
        return {...bilet}
    },
    klient ({}, getters) {
        return getters['klient/klient']
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

    async addSsuda({ dispatch }, { bilet, obespechenie, ssuda, procent }) {
        const { id: klient_id } = await dispatch('klient/save')
        const { id } = await dispatch('bilet/save', { ...bilet, obespechenie, klient_id })
        return dispatch('reestr/ssuda', { id, ssuda, procent })
    },

    async vozvrat({ dispatch }, { bilet, obespechenie, ssuda, procent, penalty }) {
        const { id: klient_id } = await dispatch('klient/save')
        const { id } = await dispatch('bilet/save', { ...bilet, obespechenie, klient_id })
        return dispatch('reestr/vozvrat', { id, ssuda, procent, penalty })
    },

    reset({ dispatch }) {
        dispatch('klient/clear')
        dispatch('bilet/clear')
        dispatch('obespechenie/clear')
    },
    async activate({dispatch}, token) {
        localStorage.setItem('x-token', token)
        await dispatch('update')
        router.push('/login')
    },

    async update  ({ commit }) {
        getToken('x-token')
        commit('company', await get('/'))
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}