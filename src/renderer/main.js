import Vue from 'vue'
import axios from 'axios'

import App from './App'
// import mixin from './mixins'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {i18n} from './setup/i18n-setup'
import {store} from './setup/store-setup'
import {router} from './setup/router-setup'
import mixins from './setup/mixins-setup'
Vue.use(BootstrapVue);
Vue.use(mixins);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  components: { App },
  i18n,
  router,
  store,
  template: '<App/>'
}).$mount('#app')
