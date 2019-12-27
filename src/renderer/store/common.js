import { db, getToken } from '@/db'
import { router } from '@/setup'
// import { toDouble }  from '@/functions'
const { get, post } = db()
const state = {
    settings: {
        ok: 0,
        minRows: 5,
        price: { '375': '10.2', '583': '20.5', '585': 25 },
        numberFormat: [2, ',', ' '],
        discounts: ['10', '15', '20'],
        maxDays: '31',
        minDays: '1',
        procent: '0.7',
        penalty: '1'
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
    klient ({}, getters) {
        return getters['klient/klient']
    },
    isAuth (state, getters) {
        return getters['user/isAuth']
    },

    isActive ({company}) {
        return !! company.id
    },

    date ({ date }) {
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

    async activate({ dispatch }, token) {
        localStorage.setItem('x-token', token)
        await dispatch('update')
        router.push('/login')
    },

    setDate  ({ commit }, v) {
        commit('date', v)
    },

    async update  ({ commit, dispatch }) {
        getToken('x-token')
        commit('company', await get('/'))
        dispatch('reestr/update')
        dispatch('klient/update')
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}