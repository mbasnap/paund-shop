<template>
  <b-modal v-model="modal" 
  content-class="edit-dialog" 
  :hide-footer="true" 
  size="lg">
    <template #modal-header="{ close }">
      <div class="row" style="width: 100%">
        <div :class="['col', { danger: value.deleted }]">
          <h3>{{ title  }}</h3>
          <div v-if="value.deleted" class="danger">
            <em>! {{ toTitleCase(value.deleted) }}</em>
          </div>
        </div>
        <div class="col p-0">
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
      <a v-for="(item, i) in tabs" :key="i" 
      :class="{ active: activetab === item.key }"
      @click="() => activetab = item.key"> 
      {{ item.value }} </a>
    </div>
    <div class="content">
      <tab-content v-model="fio" v-show="activetab === 'fio'" tabname="fio" 
      :err="err.fio"
      :items="fioItems"/>
      <tab-content v-model="passport"  v-show="activetab === 'passport'" tabname="passport" 
      :err="err.passport"
      :items="passportItems">
        <template slot="append">
          <b-row class="ma-0">
            <b-col>
              <b-button variant="outline-success" @click="addPassport" size="sm">+</b-button>
            </b-col>
          </b-row>
        </template>
      </tab-content>
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
import { toTitleCase, dateFormat, isDateValid, validDate, required } from '@/functions'
import KlientReport from '@/zvit/klient'
import TabContent from './TabContent'
import QuestionnAire from './QuestionnAire'
 
export default {
  components: { ModalEditor, TabContent, QuestionnAire },
  props: ['title'],
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
    tabs() {
      return [
        {key: 'fio', value: 'ФИО'},
        {key: 'passport', value: 'Паспорт'},
        {key: 'address', value: 'Адрес'},
        {key: 'questionnaire', value: 'Анкета'}
      ]
    },
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
        { name: 'family', value: 'Фамилия', format: toTitleCase, rules: [required('danger')] },
        { name: 'name', value: 'Имя', format: toTitleCase, rules: [required('danger')] },
        { name: 'sername', value: 'Отчество', format: toTitleCase },
        { name: 'city', value: 'Город', format: toTitleCase, rules: [required('danger')] },
        { name: 'bithday', value: 'Дата рождения', format: dateFormat, rules: [required('danger'), validDate('danger')] }
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
        { name: 'nationality', value: 'Гражданство', format: toTitleCase, rules: [required('warning')] },
        { name: 'seria', value: 'Серия', format: (v = '') => v.toUpperCase(), rules: [required('danger')] },
        { name: 'number', value: 'Номер',  rules: [required('danger')] },
        { name: 'issued', value: 'Выдан', teg: 'textarea', format: toTitleCase, rules: [required('warning')] },
        { name: 'date-issue', value: 'Дата выдачи', format: dateFormat, rules: [required('warning'), validDate('danger') ] },
        { name: 'idn', value: 'Идн.', rules: [required('warning')] },
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
      return [
      {name: 'city', value: 'Город'},
      {name: 'street', value: 'Улица'},
      {name: 'home', value: 'Дом/квартира'},
      {name: 'phone', value: 'Телефон'},
      {name: 'email', value: 'E-mail'}
      ]
    },
    questionnaire: {
      get({ fio = {}, value = {} }) {
        const date = (value.questionnaire || {}).date || fio.date
        return {...fio.questionnaire, ...value.questionnaire, date}
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
        console.log(questionnaire);
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
    },
    addPassport() {
      this.close()
      this.$emit('add')
    }
  }
}
</script>

<style >
  .edit-dialog  .modal-header  {
    padding-right: 0;
  }
  .edit-dialog  .modal-header .close {
    margin: -1rem 0 -1rem 0;
  }
  .edit-dialog .danger {
    color: brown;
  }
</style>