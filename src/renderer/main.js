import Vue from 'vue'
import App from './App'
import {store, router, i18n, mixins, bootstrapVue} from '@/setup'

Vue.use(bootstrapVue)
Vue.use(mixins)


// if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  created: function () {
          store.dispatch('init')
  },
  i18n,
  router,
  store,
  template: '<App/>'
}).$mount('#app')
