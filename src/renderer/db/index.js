import axios from 'axios'
import decode from 'jwt-decode'
const headers = axios.defaults.headers.common
// headers['x-token'] = '@ds153906.mlab.com:53906/virus'
// const  baseUrl = 'https://mba-ps-server.herokuapp.com/api/'
const baseUrl = 'http://localhost:5000/api/' 
const prfix ='x-'
const  query = (action, url, params) => {
  return axios[action](url, params)
    .then(res => res.data)
      .catch(err => {
        throw err.response.data
  })
}


export default (name) => {
  const url =  baseUrl + name
  const tokenName = prfix + name
  const setToken = (v) => {
    if (!v) return removeToken()
    headers[tokenName] = v
    localStorage.setItem(tokenName, v)
    return decode(v)
  }
  const removeToken = () => {
    delete headers[tokenName]
    localStorage.removeItem(tokenName)
    return {}
  }
  return {
    get: (action) => query('get', url + action),
    post: (action, params) => query('post', url + action, params),
    updateToken: (v) => v === false ? removeToken()
      : setToken(v || localStorage.getItem(tokenName))
  }
}
