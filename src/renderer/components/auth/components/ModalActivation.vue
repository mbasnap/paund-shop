<template>
  <b-modal v-model="modal" content-class="activate-dialog" :hide-footer="true" :title="title">
    <div class="modal-body">
      <b-table 
      hover 
      :items="items" 
      :fields="fields" 
      small
      :busy="loading === true">
      <template #cell(action)="{item}">
        <b-button 
          v-if="item.action"
          size="sm" 
          @click="action(item)" 
          :disabled="loading === item.action" 
          class="mr-2">
            <b-spinner v-if="loading === item.action" small/>
            <span v-else>{{ item.action }}</span>
        </b-button>
      </template>
      </b-table>
    </div>
    <modal-footer ok="save" :loading="loading === true" @ok="resolve" @cansel="close" :disabled="loading"/>
  </b-modal>
</template>

<script>
import ModalFooter from '@/widgets/ModalFooter'
import { dbsList, replicate, destroy } from '@/functions/db'
export default {
components: { ModalFooter },
data: () => ({
  title: '',
  modal: false,
  resolve: () => {},
  loading: false,
  fields: ['key', 'info', 'action'],
  items: []
}),
computed: {},

methods: {
  async show(token, password) {
    const { company, lombard } = token
    this.items = []
    this.title = `${company} ${lombard}`
    this.modal = true
    this.loading = true
    this.items = await Promise.all(['remote', 'local'].map(async (key) => {
      return { key, ...await this[`test_${key}`](token, password)}
    }))
    this.loading = false
    return new Promise(resolve => this.resolve = resolve)
  },
  close() {
    this.modal = false
  },
  t(name) {
    return this.$t(`btn.${name}`)
  },
  save () {
    this.$emit('save', this)
  },
  close () {
    this.$emit('close')
  },

  async test_remote(token, password) {
    const { company, remote } = token
    try {
      const { data } = await dbsList(remote, password)
      const info = data.includes(company) && remote
      if (!info) throw { message: 'company not defined' }
      return { info, action: 'sync', props: {...token, password} }
    } catch ({ message }) {
      return { info: message, _cellVariants: { info: 'danger' } }
    }
  },
  async test_local(token, password) {
    const { local } = token
    try {
      await dbsList(local, password)
      return { info: local, action: 'clear', props: {...token, password} }
    } catch ({ message }) {
      return { error: message, _cellVariants: { info: 'danger' } }
    }
  },
  action({ action, props }) {
    return this[action](props)
  },
  async sync({ local: url, remote, company, password }) {
    this.loading = 'sync'
    try {
      const { data } = await dbsList(url, password)
      await Promise.all(data.map(db => replicate(db, url, password, `${remote}/${company}`)))
    } catch({ message }) {
      console.error(message);
      return { error: message }
    } finally {
      this.loading = false
    }
  },
  async clear({ local, password }) {
    this.loading = 'clear'
    try {
      const { data } = await dbsList(local, password)
      await Promise.all(data.map(destroy))
    } catch({ message }) {
      console.error(message);
      return { error: message }
    } finally {
      this.loading = false
    }   
  }
}
}
</script>

<style>
 .success {
   color: rgb(78, 151, 4);
 }
</style>