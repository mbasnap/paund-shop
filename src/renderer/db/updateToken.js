import axios from 'axios'
import setToken from './setToken'

export default () => {
    setToken('Authorization', localStorage.getItem('jwtToken'), false)
    setToken('x-key-db', localStorage.getItem('x-key-db'), false)
}