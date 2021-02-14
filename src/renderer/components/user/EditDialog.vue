<template>
  <b-modal v-model="modal" content-class="user-dialog" :hide-footer="true" :title="t(type)">
    <div class="modal-body mb-5">
      <div class="form-row mb-2">
          <named-input class="form-control col-6 mr-1" name="summ" :placeholder="t('summ')"
          :value="model" />
          <named-select class="form-control col" :name="account" :placeholder="t('account')"
          :value="model" :options="options" @change="change" :tostring="toStringAccount"/>
      </div> 
      <div class="form-row mb-2">
          <named-select class="form-control col" name="klient" :placeholder="t('from')"
          :value="model" :options="usersOptions" @change="change"
          :tostring="fio" :tovalue="toValueKlient"/>
      </div> 
      <div class="form-row mb-2">
          <named-textarea class="form-control col" name="title"
          :placeholder="t('discription')" :value="model"/>
      </div>
    </div>
    <modal-footer ok="save" :loading="loading" @ok="onSave(values)" @cansel="close"/>
  </b-modal>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { toDouble } from '@/functions'
import mix from '@/widgets/named-input/mix.js'
import ModalFooter from '@/widgets/ModalFooter'
export default {
  components: { ModalFooter },
  props: ['accounts'],
  mixins: [ mix ],
  data: () => ({
    modal: false,
    resolve: null,
    loading: false,
    value: {},
    type: '',
  }),
  computed: {
    ...mapGetters({
        users: 'users',
        company: 'company',
    }),
    account({ type }) {
      return type === 'dt' ? 'ct' : 'dt'
    },
    model({ value }) {
      return { ...value, summ: toDouble(value.summ) }
    },
    values({ model, account, type }) {
      return {...model, values: [
        { [type]: '301', [account]: model[account], summ: model.summ },
      ]}
    },
    excludesUsers({ company }) {
      const excludes = (company['excludes-users'] || '').split(',')
      return excludes.map(v => v.trim())
    },
    usersOptions({ users, excludesUsers, fio }) {
      return users
        .filter(({ name }) => !excludesUsers.includes(name))
            .filter(v => v.active && fio(v))
    },
    options({ accounts, account, company }) {
      const excludes = v => !(company.excludes || []).includes(v)
      return Object.keys({...accounts[account] }).filter(excludes)
    }
  },
  methods: {
    ...mapActions({ remove: 'reestr/remove' }),
    onSave(v) {
      this.loading = true
      this.resolve(v)
    },
    show(v) {
      this.type = v
      this.modal = true
      return new Promise(resolve => this.resolve = resolve)
    },
    close() {
      this.loading = false
      this.modal = false
    },
    t(v) {
        return v && this.$t(`prixod_rasxod.${v}`)
    },
    change({ name, value }) {
        this.value = { ...this.value, [name]: value }
    },
    fio({ fio } = {}) {
        const { family = '', name = '', sername = '' } = fio || {}
        return `${family} ${name} ${sername}`.trim()
    },
    toValueKlient(v) {
        return {...v}._id
    },
    toStringAccount(v) {
        const { accounts, account } = this
        const title = accounts[account][v]
        return `${v} ${title}`
    },
  }
}
</script>

<style >
 .user-dialog {
    height: auto;
}
</style>