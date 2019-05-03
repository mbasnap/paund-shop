import axios from 'axios'

export default class {
  constructor (name, params) {
    this.baseUrl = 'https://mba-ps-server.herokuapp.com/api/' + name
    this.params = params
  }
  setAuthToken = token => {
    if (token) {
      // Apply to every request
      axios.defaults.headers.common['Authorization'] = token
    } else {
      // Delete auth header
      delete axios.defaults.headers.common['Authorization']
    }
  }
  query = (action, name, params) => axios[action](this.baseUrl + name, params)
    .then(res => res.data).catch(err => {
      throw err.response.data
    })
  get = name => {
      console.log(this.baseUrl + name)
    return this.query('get', name || '')
  }
  post = (name, params) => {
    return this.query('post', name || '', params)
  }
}
