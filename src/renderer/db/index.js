import axios from 'axios'
import decode from 'jwt-decode'
// import {store} from '@/setup'
// axios.interceptors.response.use(undefined, function (err) {
//   const {status, statusText} = err.response
//   return new Promise(function () {
//     console.log(status)
//     // if(status === 401) store.dispatch('logout')
//   });
// });  

const  query = (action, url, params) => {
  return axios[action](url, params)
    .then(res => res.data)
      .catch(err => {
        throw err.response.data
  })
}

const setHeaders = (name, token) => {
  const headers = axios.defaults.headers.common
  if (token) headers[name] = token
  else delete headers[name]
}

export const getToken = (name) => {
  const token = localStorage.getItem(name)
  setHeaders(name, token)
}


export const db = (name = '') => {
 const getUrl = () => 'http://localhost:8080/lombard'  + name
  return {
    get: (action) => query('get', getUrl() + action),
    post: (action, params) => query('post', getUrl() + action, params),
  }
}
