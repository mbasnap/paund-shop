import jwt  from 'jsonwebtoken'
import bcrypt  from 'bcryptjs'
import PouchDB from 'pouchdb-browser'
import { store } from '@/setup'

const SECRET_OR_KEY = 'xyz'

const  decode =  token => {
  const v = jwt.decode(token)
  if (!v) throw { token: 'bad_token' }
  return v
}
const  verify =  (token, verify = true) => {
  return  !verify ? decode(token)
    : jwt.verify(token, SECRET_OR_KEY, (err, v) => {
      if (err && err.name === 'TokenExpiredError') store.dispatch('logOut')
      return v
    })
}

const localDb = (name, password = localStorage.getItem('admin')) => {
  const local = 'http://localhost:5984'
  return new PouchDB(`${local}/${name}`, { auth: { username: 'admin', password }})
}

const { remote, lombard } = verify(localStorage.getItem('settings')) || {}

const sync = (db, params) => {
  try {
    db.sync(new PouchDB(remote), { live: true, retry: true, ...params })
    .on('change', async () => store.dispatch('update'))
    .on('error', err => console.log(err))
  } catch (err) {}
  return db
}

const  company = sync(localDb('companys'), { doc_ids: [lombard] })
const  users = sync(localDb('users'), { filter: ({ type }) => type === 'user' })
const  klients = sync(localDb('klients'), { filter: ({ type }) => type === 'klient' })
const  reestr = sync(localDb(lombard), { filter: doc => doc.type === 'reestr' && doc.lombard === lombard })
const db = { company, users, klients, reestr }

const post = async (name, v) => {
  return testAuth().then(() => {
    const { put, post } = db[name]
    const value = { lombard, ...v }
    return v._id ? put(value) : post(value)
  }).catch(() => store.dispatch('logOut'))
}

const get = async (name, id) => {
  return testAuth().then(() => {
    return id ? db[name].get(id)
    : db[name].allDocs({ include_docs: true })
      .then(({ rows }) => rows.map(v => v.doc))
  }).catch(() => store.dispatch('logOut'))  
}

const testAuth = (password = localStorage.getItem('admin')) => {
  return localDb('users', password).info()
  
  // return db.allDocs().catch(({ status }) => {
  //   const err = status === 401 ? 'unauthorized' : 'no_db_connection'
  //   throw { password: err }
  // })
}
const hash = v => bcrypt.hash(v, 10)

const sign = (v, expiresIn = '1d') => jwt.sign(v, SECRET_OR_KEY, { expiresIn })

const setUser = async (user, password) => {
  if (!password) user = await verify(localStorage.getItem('user'))
  else if (!await bcrypt.compare(password, user.password)) throw { password: 'incorect_password'}
  if (user) localStorage.setItem('user', sign({ _id: user._id }, '1h'))
  return user || {}
}

const setCompany = async (token) => {
  const settings = verify(token, false) 
  localStorage.setItem('settings', sign(settings, '1y')) 
}
  
export {
  hash,
  setUser,
  // sign,
  testAuth,
  post,
  setCompany,
  lombard,
  get,
}

