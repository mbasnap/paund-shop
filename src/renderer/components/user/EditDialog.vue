<template>
  <b-modal v-model="modal" content-class="user-dialog" :hide-footer="true" :title="data.name">
    <div class="modal-body">
      <div class="tabs ma-0" >
        <a v-for="(item) in Object.keys(tabs)" :key="item" :class="{ active: activetab === item }"
        @click="activetab = item" > {{ t('tabs', item) }} </a>
      </div>
      <div class="content">
        <div v-for="([key, item]) in Object.entries(tabs)" :key="key" class="tabcontent" v-show="activetab === key" >
          <div v-for="({ name, is, type }) in fields(item)" :key="name" class="form-group row m-0 mt-2">
            <label class="col-sm-4 col-form-label">{{ t(key, name) }}</label>
            <div class="col">
              <component 
              :is="is || 'b-form-input'" 
              :type="type || 'text'"
              :class="[{ 'is-invalid': err[name] }]" 
              :value="(data[key] || {})[name]" 
              @input="(value) => update(key, { [name]: value })">
                {{ (data[key] || {})[name] }}
              </component>
              <div v-if="err[name]" class="invalid-feedback">{{ t('err', err[name]) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-footer ok="save" :loading="loading" @ok="onSave" @cansel="close" :disabled="disabled"/>
  </b-modal>
</template>

<script>
import mix from '@/widgets/named-input/mix.js'
import { Avatar } from '@/widgets'
import ModalFooter from '@/widgets/ModalFooter'

export default {
  components: { ModalFooter, Avatar },
  props: ['loading', 'value'],
  mixins: [ mix ],
  data: () => ({
    modal: false,
    resolve: null,
    tabs: { 
      'main': ['family', 'name', 'sername', { name: 'avatar', is: 'avatar'}], 
      'passport': [
        'seria',
        'number',
        { name: 'issued', is: 'b-form-textarea'},
        { name: 'date-issue', type: 'date'},
        'idn'
       ],
      'address': ['post', 'city', 'street', 'home', 'phone', 'email'],
      'password': [{ name: 'password', type: 'password'}, { name: 'confirm', type: 'password'}],
    },
    activetab: 'main',
    data: {}
  }),
  computed: {
    password({ data }){
      const { password, confirm } = data.password || {}
      return  (password && password === confirm ) && password
    },
    err() {
      const confirm = this.notmached(this.data.password || {})
      return { confirm }
    },
    disabled({ value, data, password, err, loading}) {
      const values = (obj) => (cur, key) => ({...cur, [key]: obj[key]})
      const stringify = (obj) => 
        JSON.stringify(['main', 'passport', 'address'].reduce(values(obj), {}))
      if (err.confirm || loading) return true
      if (password) return false
      return stringify(value) === stringify(data)
    }
  },
  methods: {
    notmached({ password, confirm }) {
      if (password && password  !== confirm) return "not_mached"
    },
    fields(v) {
      return v.map(v => {
        const { name, is, type } = v
        return { name: name || v, is, type }
      })
    },
    update(key, value) {
      const data = {...this.data[key], ...value }
      this.data = {...this.data, [key]: data }
    },
    show(v) {
      this.data = {...v}
      this.modal = true
      return new Promise(resolve => this.resolve = resolve)
    },
    close() {
      this.modal = false
    },
    t(name, value) {
      return this.$t(`${name}.${value}`)
    },
    onSave() {
      const {password} = this
      return this.resolve({...this.data, password})
    }
  }
}
</script>

<style >

  .user-dialog  .avatar.form-control {
    height: auto !important;
  }
  .user-dialog {
    height: auto !important;
  }

</style>