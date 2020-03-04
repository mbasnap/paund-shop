import jwtDecode  from 'jwt-decode'
import PouchDB from 'pouchdb-browser'
PouchDB.plugin(require('pouchdb-authentication'))
// import axios from 'axios'
import { store, router } from '@/setup'
const { local, remote, lombard } = JSON.parse(localStorage.getItem('settings')) || []
const { name: user } = JSON.parse(localStorage.getItem('user')) || []
const password = localStorage.getItem('admin')
const auth = { username: 'admin', password }
const onError = (err) => {
  console.log(err); 
  if (err.status === 401) store.dispatch('changeAccount').then(() => router.go())
}


const users = new PouchDB(`${local}/_users`, { auth } )
users.sync(new PouchDB(`${remote}_user`), { live: true, retry: true })
.on('change', async () => {
  const { name } = localStorage.getItem('user') || {}
  const { active } = await get('users', name)
  if (!active )  store.dispatch('logOut')
})
.on('error', onError)

// const getUser = name =>
//   name ? user.getUser(name) : user.allDocs({ include_docs: true })
    // .then(({ docs}) => docs)



const klients = new PouchDB(`${local}/klient`, { auth })
  klients.sync(new PouchDB(`${remote}_klient`), { live: true, retry: true })
  .on('change', v => store.dispatch('klient/update'))
  .on('error', onError)
const company = new PouchDB(`${local}/company`, { auth })
  company.sync( new PouchDB(`${remote}`), { live: true, retry: true, doc_ids: [lombard] })
  .on('change', v => store.dispatch('update'))
  .on('error', onError)

const reestr = new PouchDB(`${local}/${lombard}_reestr`, { auth })
  reestr.sync(new PouchDB(`${remote}_reestr`), { live: true, retry: true,
  filter(doc) {
    return doc.lombard === lombard;
  }
  })
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

const login = async (name, password) =>
  users.logIn(name, password).then(() => users.getUser(name))

const loginAdmin = v => !localStorage.getItem('admin') ? 
  localStorage.setItem('admin', v) : true
export {
  // db,
  post,
  jwtDecode,
  // user,
  login,
  // getUser,
  // klient,
  loginAdmin,
  get,
  // reestr
}

