import router from './router-setup'
import {store} from './store-setup'
import {i18n} from './i18n-setup'
import mixins from './mixins-setup'
import db from './db-setup'
import bootstrapVue from './bootstrapVue-setup'

// router.beforeEach(({ path }, from, next) => {
//   store.dispatch('fetchToken')
//   if (path === '/profile') {
//     if (!store.getters.isAuth) {
//       next('/login')
//     }
//   }
//   if (path === '/login') {
//     if (store.getters.isAuth) {
//       next('/profile')
//     }
//   }
//   next()
// })

// router.beforeEach(({path}, from, next) => {
//     // console.log(path)
//     const isActive = store.getters['isActive'] 
//     const activate = '/activate'
//     path !== activate  ? next(isActive || activate ) : next()
//   })
  db ({
    onResponseErr: (err) => console.log(err)
  })
export  {
    // db,
    router,
    store,
    i18n,
    mixins,
    bootstrapVue
}