import Vue from 'vue'
// import axios from 'axios'
import App from './App'
import {store, router, i18n, mixins, bootstrapVue} from '@/setup'

Vue.use(bootstrapVue);
Vue.use(mixins);

// if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  created: function () {
          this.$store.dispatch('user/updateFromToken')
    // axios.interceptors.response.use(undefined, function (err) {
    //   return new Promise(function (resolve, reject) {
    //     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
    //     // if you ever get an unauthorized, logout the user
    //       this.$store.dispatch('user/logout')
    //     // you can also redirect to /login if needed !
    //     }
    //     throw err;
    //   });
    // });
  },
  i18n,
  router,
  store,
  template: '<App/>'
}).$mount('#app')
