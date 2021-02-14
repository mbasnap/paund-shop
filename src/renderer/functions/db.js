
import PouchDB from 'pouchdb-browser'
import { store } from '@/setup'
import axios from 'axios'
const auth = { username: 'admin', password: localStorage.getItem('admin') }

const local = (name, url = localStorage.getItem('local')) => {
  const local = name ? `${url}/${name}` : url
  return local && new PouchDB(local, { auth })
}
const conn = (url, name, auth) => {
  const conn = name ? `${url}/${name}` : url
  return conn && new PouchDB(conn, { auth })
}

const dbsList = (url) => {
  return axios.get(`${url}/_all_dbs`, { auth });
}

const destroy = async (name) => {
  return local(name).destroy()
}

const remote = `${localStorage.getItem('remote')}/${localStorage.getItem('company')}`
const sync = (db, params) => {
  try {
    db.sync(new PouchDB(remote), { live: true, retry: true, ...params })
    .on('change', async () => {
      store.dispatch('update')
    })
    .on('error', err => console.log(err))
  } catch (err) {}
  return db
}

const replicate = (name) => {
  return local(name).replicate.to(new PouchDB(remote))
}


const lombard = localStorage.getItem('lombard')
const company = sync(local('companys'), { doc_ids: [lombard] })
const users = sync(local('users'), { filter: ({ type }) => type === 'user' })
const klients = sync(local('klients'), { filter: ({ type }) => type === 'klient' })
const reestr = sync(local(lombard), { filter: doc => doc.type === 'reestr' && doc.lombard === lombard })
const db = { company, users, klients, reestr }


const updateDoc = async (name, value) => {
  const { _rev } = await db[name].get(value._id)
  return db[name].put({...value, _rev })
}

const post = async (name, v) => {
  return testAuth().then(() => {
    const value = { lombard, ...v }
    return v._id ? updateDoc(name, value) : db[name].post(value)
  })
  // .catch( 
  //   ({status}) => store.dispatch('logOut', status === 404)
  // )
}

const get = async (name, id) => {
  return testAuth().then(() => {
    return id ? db[name].get(id)
    : db[name].allDocs({ include_docs: true })
      .then(({ rows }) => rows.map(v => v.doc))
  }).catch(err => {
    console.log(err);
    // store.dispatch('logOut', status === 404)
  })
}

const testAuth = (password = localStorage.getItem('admin')) => {
  return local('users', password).info()
}
 
export {
  testAuth,
  post,
  get,
  conn,
  dbsList,
  replicate,
  destroy,
  local
}

