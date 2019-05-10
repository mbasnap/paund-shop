import axios from 'axios'

const common = axios.defaults.headers.common
export default (name, token, setStorage = true) => {
  if (token) { 
    common[name] = token 
    if (setStorage) localStorage.setItem(name, token)
}
  if (token === false) {
    delete common[name]
    if (setStorage) localStorage.removeItem(name)
  }
  }