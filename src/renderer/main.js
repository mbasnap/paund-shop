import Vue from 'vue'
import axios from 'axios'
import updateToken from './db/updateToken'

import App from './App'
// import mixin from './mixins'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {store, router, i18n, mixins} from './setup'

Vue.use(BootstrapVue);
Vue.use(mixins);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
updateToken()
/* eslint-disable no-new */
new Vue({
  components: { App },
  created: function () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        // if you ever get an unauthorized, logout the user
          this.$store.dispatch(logout)
        // you can also redirect to /login if needed !
        }
        throw err;
      });
    });
  },
  i18n,
  router,
  store,
  template: '<App/>'
}).$mount('#app')
