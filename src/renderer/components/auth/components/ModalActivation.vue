<template>
<div class="modal-content">
    <div class="modal-header">
    <button type="button" class="close" @click="close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <div v-for="({ key, info, error }, i) in test" :key="i">
        <span v-for="(v, i) in [key, info, error]" :key="i" class="mr-2" >{{ v }}</span>
      </div>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" @click="close">{{ t('cansel') }}</button>
    <button type="button" class="btn btn-primary" 
    @click="activate(token)">{{$t('auth.activate')}}</button>
    </div>
</div>
</template>

<script>
import { dbsList, replicate, destroy } from '@/functions/db'
export default {
props: ['token'],
data: () => ({
  test: []
}),
computed: {
  map({ test }) {
    return Object.values(test).reduce((cur, v) => ({...cur, [v.key]: v}), {})
  }
},
async created() {
  const test = ['remote', 'local', 'sync_local', 'clear_local', 'clear_storage' ]
  try {
    for (const key of test) {
      const { info, error } = await this[`test_${key}`](this.token)
      this.test.push({ key, info, error })
    }
  } catch(err) {
    console.error(err)
  }
},
methods: {
  t(name) {
    return this.$t(`btn.${name}`)
  },
  save () {
    this.$emit('save', this)
  },
  close () {
    this.$emit('close')
  },
  activate({ lombard, company, remote, local }) {
    localStorage.setItem('lombard', lombard)
    localStorage.setItem('company', company)
    localStorage.setItem('remote', remote)
    localStorage.setItem('local', local)
    window.location.reload()
  },
  async test_remote({ company, remote }) {
    try {
      const { data } = await dbsList(remote)
      const info = data.includes(company) && 'ok'
      if (!info) throw { message: 'company not defined' }
      return { info }
    } catch ({ message }) {
      return { error: message }
    }
  },
  async test_local({ local }) {
    try {
      await dbsList(local)
      return { info: 'ok' }
    } catch ({ message }) {
      return { error: message }
    }
  },
  async test_sync_local() {
    const local = localStorage.getItem('local')
    try {
      const { error } = this.test.find(v => v.key === 'remote')
      if (error) throw { message: error }
      const { data } = await dbsList(local)
      await Promise.all(data.map(replicate))
      return { info: 'ok' }
    } catch({ message }) {
      return { error: message }
    }
  },
  async test_clear_local() {
    const local = localStorage.getItem('local')
    try {
      const { error } = this.test.find(v => v.key === 'remote')
      if (error) throw { message: error }
      const { data } = await dbsList(local)
      await Promise.all(data.map(destroy))
      return { info: 'ok' }
    } catch({ message }) {
      return { error: message }
    }
  },
  test_clear_storage() {
    const local = localStorage.getItem('local')
    try {
      ['remote', 'local', 'company', 'lombard'].forEach(v => {
        localStorage.removeItem(v)
      })
      return { info: 'ok' }
    } catch({ message }) {
      return { error: message }
    }
  }
}
}
</script>

<style>

</style>