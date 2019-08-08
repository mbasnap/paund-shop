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
    // saveTransaction({dispatch}, transaction) {
    //     const t_id = '1'
    //     transaction.forEach(element => {
    //         dispatch('reestr/save', {...element, t_id})
    //     });
    // },
    async vidanaSsuda({dispatch}, {bilet, ssuda, procent}) {
        const {id: klient_id} = await dispatch('klient/save')
        return dispatch('reestr/save', [
            {dt: '001', ...bilet, klient_id},
            {dt: '377', ct: '301', ...ssuda},
            {dt: '301', ct: '703', ...procent}    
        ])
    },
    async vozvrashenaSsuda({dispatch}, {bilet, ssuda, procent, penalty}) {
        const {id: klient_id} = await dispatch('klient/save')
        return dispatch('reestr/save', [
            {ct: '001', ...bilet, klient_id},
            {dt: '301', ct: '377', ...ssuda},
            {dt: '301', ct: '703', ...procent},      
            {dt: '301', ct: '704', ...penalty}
        ])
    },
    reset({dispatch}) {
        dispatch('klient/clear')
        dispatch('bilet/clear')
        dispatch('obespechenie/clear')
    },
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
        dispatch('reestr/update')
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}