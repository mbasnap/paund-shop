import {store} from '@/setup'
const isAuthenticated = (from, to, next) => 
    store.getters['user/isAuthenticated'] ? next() : next('/login')

export {
    isAuthenticated
}