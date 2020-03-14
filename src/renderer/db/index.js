import jwtDecode  from 'jwt-decode'
import jwt  from 'jsonwebtoken'
import bcrypt  from 'bcryptjs'
import PouchDB from 'pouchdb-browser'

// PouchDB.plugin(require('pouchdb-authentication'))
import { store, router } from '@/setup'
const local = 'http://localhost:5984'
const { remote, lombard, SECRET_OR_KEY } = JSON.parse(localStorage.getItem('settings')) || []
const { name: user } = JSON.parse(localStorage.getItem('user')) || []
const live = { live: true, retry: true }

const password = localStorage.getItem('admin')
const auth = { username: 'admin', password }

const onError = (err) => {
  console.log(err); 
  // if (err.status === 401) store.dispatch('changeAccount').then(() => router.go())
}

const  verify = async (token) =>  {
  const value = jwt.verify(token, SECRET_OR_KEY)
  if (!value) throw 'bad_token'
  return value
}

const sign = (v, expiresIn) => jwt.sign(v, SECRET_OR_KEY)


const users = new PouchDB(`${local}/users`, { auth } )
if (remote) users.sync(new PouchDB(remote), { ...live, filter: ({ type }) => type === 'user' })
.on('change', async (v) => {  
  users.get(user).then(v => {
      // if(!active) throw 'not active'
      // else 
      console.log(v);      
      store.dispatch('update')
    })
    // .catch((err) => store.dispatch('logOut'))
}).on('error', onError)

const klients = new PouchDB(`${local}/klients`, { auth })
if (remote) klients.sync(new PouchDB(remote), { ...live, filter: ({ type }) => type === 'klient' })
  .on('change', v => store.dispatch('klient/update'))
  .on('error', onError)
const company = new PouchDB(`${local}/companys`, { auth })
if (remote)  company.sync( new PouchDB(remote), { ...live, doc_ids: [lombard] })
.on('change', async (v) => {  
  company.get(lombard).then(v => {
    // if(!active) throw 'not active'
    // else 
    console.log(v);
    
    store.dispatch('update')
    })
    // .catch((err) => store.dispatch('logOut'))
}).on('error', onError)

const reestr = new PouchDB(`${local}/${lombard}`, { auth })
if (remote) reestr.sync(new PouchDB(remote), { ...live, filter: ({ type }) => type === 'reestr' })
  .on('change', v => store.dispatch('reestr/update'))
  .on('error', onError)


const db = { company, users, klients, reestr }

const post = (name, v) => {
  const value = {...v, lombard, user }
  return v._id ? db[name].put(value) : db[name].post(value)
}

const get = (name, id) => id ? db[name].get(id)
  : db[name].allDocs({ include_docs: true })
    .then(({ rows }) => rows.map(v => v.doc))

const login = async (name, password) => {
  const { active } = await company.get(lombard)
  if (!active) throw 'company_not_active'
  return users.get(name).then(user => {
    if (!user.active) throw 'user_not_active'
    else return user
  })
  // return !!user && await bcrypt.compare(password, user.password) ? user : false
}

const loginAdmin = v => !localStorage.getItem('admin') ? 
  localStorage.setItem('admin', v) : true

// const hash = v => bcrypt.hash(v, 10)
// const hash = v => bcrypt.hash(v, 10)
  
export {
  bcrypt,
  // hash,
  post,
  jwtDecode,
  login,
  loginAdmin,
  get,
  users
}

