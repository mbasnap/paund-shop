import jwtDecode  from 'jwt-decode'
import PouchDB from 'pouchdb-browser'
PouchDB.plugin(require('pouchdb-authentication'))
import { store, router } from '@/setup'
const local = 'http://localhost:5984'
const { remote, lombard } = JSON.parse(localStorage.getItem('settings')) || []
const { name: user } = JSON.parse(localStorage.getItem('user')) || []
// console.log(local );

const password = localStorage.getItem('admin')
const auth = { username: 'admin', password }
const onError = (err) => {
  console.log(err); 
  if (err.status === 401) store.dispatch('changeAccount').then(() => router.go())
}


const users = new PouchDB(`${local}/_users`, { auth } )
if (remote) users.sync(new PouchDB(remote), { live: true, retry: true,
  filter(doc) {
    return doc.type === 'user'
  }
})
.on('change', async (v) => {
  console.log(v);
  console.log(user);
  
  users.getUser(user).then(({ active }) => {
      if(!active) throw 'not active'
      else store.dispatch('update')
    }).catch((err) => {
      console.log(err);
      
      store.dispatch('logOut')
    })
})
.on('error', onError)


const klients = new PouchDB(`${local}/klients`, { auth })
if (remote) klients.sync(new PouchDB(remote), { live: true, retry: true,
  filter(doc) {
    return doc.type === 'klient'
  }
  })
  .on('change', v => store.dispatch('klient/update'))
  .on('error', onError)
const company = new PouchDB(`${local}/companys`, { auth })
if (remote)  company.sync( new PouchDB(remote), { live: true, retry: true, doc_ids: [lombard] })
  .on('change', v => store.dispatch('update'))
  .on('error', onError)

const reestr = new PouchDB(`${local}/${lombard}`, { auth })
if (remote) reestr.sync(new PouchDB(remote), { live: true, retry: true,
  filter(doc) {
    return doc.type === 'reestr' && doc.lombard === lombard;
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

const login = async (name, password) => {
  const user = await users.logIn(name, password)
    .then(() => users.getUser(name))
    if (!user.active) throw 'not_active'
    else return user
}

const loginAdmin = v => !localStorage.getItem('admin') ? 
  localStorage.setItem('admin', v) : true
export {
  post,
  jwtDecode,
  login,
  loginAdmin,
  get
}

