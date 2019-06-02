import axios from 'axios'
import decodeToken from 'jwt-decode'
import {store} from '@/setup'
const headers = axios.defaults.headers.common

// headers['x-token'] = '@ds153906.mlab.com:53906/virus'
// const  baseUrl = 'https://mba-ps-server.herokuapp.com/api/'
// const baseUrl = 'http://localhost:5000/api/' 
const  query = (action, url, params) => {
  // console.log(url)
  return axios[action](url, params)
    .then(res => res.data)
      .catch(err => {
        throw err.response.data
  })
}

export const setHeaders = (name, v) => {
  v ? headers[name] = v : delete headers[name]
}

export const decode = (v) => v ? decodeToken(v) : {}

export const db = (name) => {
 const getUrl = () => store.getters.url + '/api/' + name
  return {
    get: (action) => query('get', getUrl() + action),
    post: (action, params) => query('post', getUrl() + action, params),
  }
}
