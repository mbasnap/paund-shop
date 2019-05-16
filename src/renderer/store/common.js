import DataBase from '@/db'
const { get, post, updateToken} = new DataBase('company')

const state = {
    date: new Date(),
    logo: 'PS',
    menu: [ 
        {
          name: "vidacha",
          value: "/vidacha"
        },
        {
          name: "vozvrat",
          value: "/vozvrat"
        },
    
        {
          name: "sklad",
          value: "/sklad"
        }
    ],
    company: {},
    err: '',
}
const getters = {

    isActive ({company}) {
        return !!company.active
    },
    date ({date}) {
        return date
    },
    menu ({menu}) {
        return menu
    },
    logo ({logo}) {
        return logo
    },
    err ({err}) {
        return err
    }

}
const mutations = {
    date (state, v) {
        state.date = v
    },
    company (state, v) {
        state.company = v
    },
    err (state, v) {
        state.err = v
    }
}
const actions = {
    clear ({ dispatch }) {
        dispatch('user/clear')           
        dispatch('bilet/clear')           
        dispatch('obespechenie/clear')           
    },
    setDate ({ commit }, v) {
        commit('date', v)          
    },
    activate({ commit }, v) {
        return post('/activate', v)
            .then(res => updateToken(res))
                .catch(err => commit('err', err))
    },
    init ({ commit, dispatch }) {
        commit('company', updateToken())
        dispatch('user/init')
    }
}

export default {
    // namespaced: true,
    state,
    getters,
    mutations,
    actions
}