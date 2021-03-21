<template>
  <b-modal v-model="modal" 
  content-class="edit-dialog" 
  :hide-footer="true" 
  size="lg">
    <template #modal-header="{ close }">

      <div class="row" style="width: 100%">
        <div class="col">
          <h3>{{ fio.family + ' ' + fio.name + ' ' + fio.sername  }}</h3>
        </div>
        <div class="col-4 p-0">
          <div class="row">
            <b-button class="mx-2" variant="outline-danger"  @click="$emit('remove')">
              <b-icon icon="trash" aria-hidden="true"></b-icon>
            </b-button>
            <b-button class="mx-2" variant="outline-secondary"  @click="print">
              <b-icon icon="printer" aria-hidden="true"></b-icon>
            </b-button>
            <button 
            type="button" 
            class="close" 
            style="outline: none;"
            @click="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </template>
    <div class="tabs" >
      <a v-for="(item, i) in ['fio', 'passport', 'address', 'questionnaire']" :key="i" 
      :class="{ active: activetab === item }"
      @click="activetab = item"> {{ t(item) }} </a>
    </div>
    <div class="content">
      <tab-content v-model="fio" v-show="activetab === 'fio'" tabname="fio" 
      :err="err.fio"
      :items="fioItems"/>
      <tab-content v-model="passport"  v-show="activetab === 'passport'" tabname="passport" 
      :err="err.passport"
      :items="passportItems"/>
      <tab-content v-model="address"  v-show="activetab === 'address'" tabname="address" 
      :err="err.address"
      :items="addressItems"/>
      <questionn-aire ref="questionn-aire" v-show="activetab === 'questionnaire'"
      v-model="questionnaire"/>
    </div>
  </b-modal>

</template>

<script>
import ModalEditor from '@/widgets/Modal.vue'
import { mapGetters, mapActions } from 'vuex'
import { toTitleCase, dateFormat, isDateValid } from '@/functions'
import KlientReport from '@/zvit/klient'
import TabContent from './TabContent'
import QuestionnAire from './QuestionnAire'
export default {
  components: { ModalEditor, TabContent, QuestionnAire },
  provide() {
    return { onChange: this.onChange }
  },
  data: () => ({
    modal: false,
    resolve: null,
    loading: false,
    activetab: 'fio',
    value: {},
    selected: ''
  }),
  computed: {
    ...mapGetters('klient', ['map', 'docs', 'group']),
    fio: {
      get({ selected: id, value }) {
          return {...this.map[id], ...value}
      },
      set({ name, value }) {
          this.value = {...this.value, [name]: value } 
      }
    },
    fioItems() {
      return [
        { name: 'family', format: toTitleCase },
        { name: 'name', format: toTitleCase },
        { name: 'sername', format: toTitleCase },
        { name: 'city', format: toTitleCase },
        { name: 'bithday', format: dateFormat }
        ]
    },
    passport: {
      get({ fio = {}, value = {} }) {
        return {...fio.passport, ...value.passport}
      },
      set({ name, value }) {
        const passport = {...this.passport, [name]: value }
        this.value = {...this.value, passport } 
      },
    },
    passportItems() {
      return [
        { name: 'nationality', format: toTitleCase },
        { name: 'seria', format: (v = '') => v.toUpperCase() },
        { name: 'number' },
        { name: 'issued', teg: 'textarea', format: toTitleCase },
        { name: 'date-issue', format: dateFormat },
        { name: 'idn' },
      ]
    },
    address: {
      get({ fio = {}, value = {} }) {
        return {...fio.address, ...value.address }
      },
      set({ name, value }) {

        const address = {...this.address, [name]: value }
        this.value = {...this.value, address } 
      }
    },
    addressItems() {
      return ['city', 'street', 'home', 'phone', 'email']
    },
    questionnaire: {
      get({ fio = {}, value = {} }) {
        return {...fio.questionnaire, ...value.questionnaire}
      },
      set(questionnaire) {
        this.value = {...this.value, questionnaire }
      }
    },
    err() {
      const fio = { bithday: !isDateValid(this.fio.bithday) }
      const passport = { "date-issue": !isDateValid(this.passport['date-issue'])}
      return { fio, passport }
    }
  },
  methods: {
    toTitleCase, dateFormat,
    ...mapActions('klient', ['save']),
    onChange() {
      const { fio, passport, address, questionnaire } = this
      this.$nextTick(() => {
        this.save({ ...fio, passport, address, questionnaire })
      })           
    },
    print() {
      const { model: questionnaire } = this.$refs['questionn-aire']
      const value = {...this.fio, questionnaire }
      this.close()
      this.$modal.show(KlientReport, { value }, { width: '850', height: '500'})            
    },

    show(v = {}) {
      this.value = v
      this.modal = true
      return new Promise(resolve => this.resolve = resolve)
    },
    close() {
      this.modal = false
      this.resolve(this.value)
    },
    t(v) {
      return this.$t(`tabs.${v}`)
    }
  }
}
</script>

<style scoped>
 .edit-dialog {
    max-height: none;
    width: 800px !important;
}

</style>