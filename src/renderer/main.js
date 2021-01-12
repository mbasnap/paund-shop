import Vue from 'vue'
import App from './App'
import VModal from 'vue-js-modal'
import { store, router, i18n, mixins } from '@/setup'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueHtmlToPaper from 'vue-html-to-paper';
Vue.use(BootstrapVue)
Vue.use(mixins)
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })
Vue.use(VueHtmlToPaper);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  i18n,
  router,
  store,
  template: '<App/>'
}).$mount('#app')