
import axios from 'axios'

export default (opt) => {
    axios.interceptors.response.use(undefined, function (err) {
        console.log(err.response)
        const {status, statusText} = err.response
        return new Promise(function () {
            opt.onResponseErr({err: status, value: statusText})
        });
      });    
}