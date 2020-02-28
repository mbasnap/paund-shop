import jwtDecode  from 'jwt-decode'
import PouchDB from 'pouchdb-browser'
var Auth = require('pouchdb-auth')
PouchDB.plugin(Auth)

import axios from 'axios'
import { store } from '@/setup'
const { name, remote_url } = JSON.parse(localStorage.getItem('settings')) || {}
const local =  `http://localhost:5984`
// const remote = `http://93.125.75.52:5984/virus`
const remote = `${remote_url}/${name}`

const auth = { 
  username: 'admin',
  password: 'Stalker01'
}
const user = new PouchDB(`${local}/_users`, { auth })
user.useAsAuthenticationDB()

const klient = new PouchDB(`${local}/klient`)
  klient.sync( new PouchDB(`${remote}-klient`), { live: true, retry: true })
  .on('change', v => store.dispatch('klient/update'))
  .on('error', v => console.log(v))
const company = new PouchDB(`${local}/company`)
  company.sync( new PouchDB(`${remote}-company`), { live: true, retry: true })
  .on('change', v => store.dispatch('update'))
  .on('error', v => console.log(v))
const reestr = new PouchDB(`${local}/reestr`)
  reestr.sync( new PouchDB(`${remote}-reestr`), { live: true, retry: true })
  .on('change', v => store.dispatch('reestr/update'))
  .on('error', v => console.log(v))


axios.interceptors.response.use(undefined, function (err) {
  const {status, statusText} = err.response
  return new Promise(function () {
    console.log(err);
    
    // if (status === 401) store.dispatch('user/logout')
  })
})

const  query = (action, url, params) => {
  // const { date } = store.getters
  return axios[action](url, params)
    .then(res => res.data)
      .catch(err => { throw err.response.data })
}

// const setHeaders = (name, token) => {
//   const headers = axios.defaults.headers.common
//   if (token) headers[name] = token
//   else delete headers[name]
// }

// const getToken = (name) => {
//   const token = localStorage.getItem(name)
//   setHeaders(name, token)
// }

const db = (name = '') => {
 const getUrl = () => 'http://localhost:8080/lombard'  + name
  return {
    get: (action) => query('get', getUrl() + action),
    post: (action, params) => query('post', getUrl() + action, params),
  }
}

const post = (url, v) => query('post', url, v)

export {
  db,
  post,
  jwtDecode,
  user,
  klient,
  company,
  reestr
}

