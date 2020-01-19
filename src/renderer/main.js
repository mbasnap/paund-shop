import Vue from 'vue'
import App from './App'
import VModal from 'vue-js-modal'
import { store, router, i18n, mixins, bootstrapVue } from '@/setup'
import VueHtmlToPaper from 'vue-html-to-paper';
// import VuePouchDB from 'vue-pouch-db';
// Vue.use(VuePouchDB);
// import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/default.css'
// import PouchVue from 'pouch-vue';
// import PouchDB from 'pouchdb-browser'
// PouchDB.plugin(require('pouchdb-find'));
// PouchDB.plugin(require('pouchdb-live-find'));
// Vue.use(PouchVue, {
//   pouch: PouchDB,    // optional if `PouchDB` is available on the global object
//   defaultDB: 'ps1',  // this is used as a default connect/disconnect database
//   // optionDB: {}, // this is used to include a custom fetch() method (see TypeScript example)
//   // debug: '*' // optional - See `https://pouchdb.com/api.html#debug_mode` for valid settings (will be a separate Plugin in PouchDB 7.0)
// });
Vue.use(bootstrapVue)
Vue.use(mixins)
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })
Vue.use(VueHtmlToPaper);

// if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// const bucket = new VuePouchDB.Bucket({
//   config: {
//     // Remote Server
//     remote: 'http://localhost:5984',
 
//     // Is DB Remote Only?, default: false
//     remoteOnly: false,
 
//     // db.allDocs({options})
//     allDocs: {
//       include_docs: true
//     },
 
//     // new Pouch({options})
//     options: {
//       ajax: {
//         cache: true
//       }
//     },
//     // Pouch.sync({option}) for every Instance
//     sync: {
//       since: 0,
//       live:  true,
//       retry: true
//     },
 
//     // db.changes({option})
//     changes: {
//       since: 'now',
//       live: true,
//       include_docs: true
//     },
 
//     // Global onChange events
//     // for each database.
//     // The functions here are passed to each DB
//     // db.changes().on(() => {})
//     onChanges(change) {
//       console.log("Change: ", change);
//     },
//     onPaused(error) {
//       console.log("Paused", error);
//     },
//     onActive() {
//       console.log("Active");
//     },
//     onDenied(error) {
//       console.log("Denied", error);
//     },
//     onComplete() {
//       console.log("Completed");
//     },
//     onError(error) {
//       console.log("Error", error);
//     },
//     cancel(cancel) {
//       // 'cancel' var is a function to be called
//       // when something bad happens. It will
//       // Cancel the watch event on CouchDB
//     }
//   },
 
//   // List of PouchDB plugins
//   plugins: [
//     // require('pouchdb-plugin')
//   ]
// })

/* eslint-disable no-new */
new Vue({
  components: { App },
  // bucket,
  i18n,
  router,
  store,
  template: '<App/>'
}).$mount('#app')

// Vue.component('VueSlider', VueSlider)