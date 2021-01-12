import jwt  from 'jsonwebtoken'
import bcrypt  from 'bcryptjs'

const  verify = token => {
  return  jwt.verify(token, localStorage.getItem('admin'), (err, v) => {
    // if (err && err.name === 'TokenExpiredError') 
    return v
  })
}
const compare = (v1, v2) => {
  return bcrypt.compare(v1, v2)
}
const  decode = token => {
  return !!token && jwt.decode(token)
}
const hash = v => bcrypt.hash(v, 10)

const sign = (v, expiresIn = '1d') => jwt.sign(v, localStorage.getItem('admin'), { expiresIn })

export {
  verify,
  compare,
  decode,
  hash,
  sign
}