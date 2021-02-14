<template>
  <b-modal v-model="modal" 
  height="auto"
  content-class="edit-dialog" 
  :hide-footer="true" 
  :hide-header="true" 
  size="lg">
    <template #modal-header="{ close }">

      <b-row>
        <b-col>
          <b-button variant="outline-danger" size="sm" class="mb-2" @click="remove">
            <b-icon icon="trash" aria-hidden="true"></b-icon>
          </b-button>
        </b-col>
        <b-col cols="1">
          <b-button variant="outline-secondary" size="sm" class="mb-2" @click="print">
            <b-icon icon="printer" aria-hidden="true"></b-icon>
          </b-button>
        </b-col>
        <b-col cols="1">
          <button type="button" 
          class="close" aria-label="Close" 
          style="outline: none;"
          @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </b-col>
      </b-row>
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
    <remove-dialog ref="remove-dialog"/>
  </b-modal>

</template>

<script>
import ModalEditor from '@/widgets/Modal.vue'
import { mapGetters, mapActions } from 'vuex'
import { toTitleCase, dateFormat, isDateValid } from '@/functions'
import KlientReport from '@/zvit/klient'
import TabContent from './TabContent'
import QuestionnAire from './QuestionnAire'
import RemoveDialog from './RemoveDialog'
export default {
  components: { ModalEditor, TabContent, QuestionnAire, RemoveDialog },
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
    async remove() {
      await this.$refs['remove-dialog'].show(this.fio)
      this.modal = false
      this.resolve()
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

<style >
 .edit-dialog {
    max-height: none;
    height: 600px;
    width: 600px !important;
}
</style>