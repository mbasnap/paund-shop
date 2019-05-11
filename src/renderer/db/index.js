import axios from 'axios'
import setHeadersToken from './setHeadersToken'
const baseUrl = 'http://localhost:5000/api/' 
const  query = (action, url, params) => {
  return axios[action](url, params)
    .then(res => res.data)
      .catch(err => {
        throw err.response.data
  })
}


export default class {
  constructor (table) {
    // this.baseUrl = 'https://mba-ps-server.herokuapp.com/api/' + name
    this.table = table
  }

  getUrl = action => baseUrl + this.table + action

  get = action => {
    return query('get', this.getUrl(action))
  }
  post = (action, params) => {
    return query('post', this.getUrl(action), params)
  }
  setHeadersToken = setHeadersToken
}
