<template> 
<modal-editor class="klient" :title="t(title)" :footer="false">
    <div class="tabs" >
        <a v-for="(item, i) in ['fio', 'passport', 'address', 'questionnaire']" :key="i"
        :class="{ active: activetab === item }"
        @click="activetab = item"> {{ t(item) }} </a>
        <div class="row">
            <div class="col"><svg-print width="25px;" style="text-align: right;"
            @click="print"/> </div>
        </div> 
    </div>
    <div class="content">
        <tab-content v-model="fio" v-show="activetab === 'fio'" tabname="fio" :err="err.fio"
        :items="fioItems">
        </tab-content>
        <tab-content v-model="passport"  v-show="activetab === 'passport'" tabname="passport" :err="err.passport"
        :items="passportItems">
        </tab-content>
        <tab-content v-model="address"  v-show="activetab === 'address'" tabname="address" :err="err.address"
        :items="addressItems">
        </tab-content>
        <questionn-aire ref="questionn-aire" v-model="questionnaire"  v-show="activetab === 'questionnaire'"/>
    </div>
</modal-editor>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import { SvgPrint } from '@/svg'
import ModalEditor from '@/widgets/Modal.vue'
import { toTitleCase, dateFormat, isDateValid } from '@/functions'
import KlientReport from '@/zvit/klient'
import TabContent from './TabContent'
import QuestionnAire from './QuestionnAire'
export default {
    components: { ModalEditor, SvgPrint, TabContent, QuestionnAire },
    props: { title: String, value: String },
    provide() {
        return { onChange: this.onChange }
    },
    data() {
        return {
            tabs: ['fio', 'passport', 'address', 'questionnaire'],
            activetab: 'fio',
            data: {}
        }
    },
    computed: {
      ...mapGetters('klient', ['map', 'docs', 'group']),
        fio: {
            get({ value: id }) {
                return {...this.map[id], ...this.data}
            },
            set({ name, value }) {
                this.data = {...this.data, [name]: value } 
            }
        },
        fioItems() {
            return [
                { name: 'family', format: toTitleCase },
                { name: 'name', format: toTitleCase },
                { name: 'sername', format: toTitleCase },
                'city',
                { name: 'bithday', format: dateFormat }]
        },
        passport: {
            get({ fio, data }) {
                return {...fio.passport, ...data.passport}
            },
            set({ name, value }) {
                const passport = {...this.passport, [name]: value }
                this.data = {...this.data, passport } 
            },
        },
        passportItems() {
            return [
                { name: 'nationality', format: toTitleCase },
                { name: 'seria', format: (v = '') => v.toUpperCase() },
                'number',
                { name: 'issued', teg: 'textarea', format: toTitleCase },
                { name: 'date-issue', format: dateFormat },
                'idn'
            ]
        },
        address: {
            get({ fio }) {
                return {...fio.address, ...this.data.address}
            },
            set({ name, value }) {
                const address = {...this.address, [name]: value }
                this.data = {...this.data, address } 
            }
        },
        addressItems() {
            return ['city', 'street', 'home', 'phone', 'email']
        },
        questionnaire: {
            get({ fio }) {
                return {...fio.questionnaire, ...this.data.questionnaire}
            },
            set(questionnaire) {
                this.data = {...this.data, questionnaire } 
            }
        },
        err({ data, value }) {
            const fio = { bithday: !isDateValid(this.fio.bithday) }
            const passport = { "date-issue": !isDateValid(this.passport['date-issue'])}
            return { fio, passport }
        }
    },
    methods: { 
        toTitleCase, dateFormat,
        ...mapActions('klient', ['save', 'remove']),
        onChange() {
            const { fio, passport, address, questionnaire } = this
            this.$nextTick(() => {
                this.save({ ...fio, passport, address, questionnaire })
            })           
        },
        print() {
            const { model: questionnaire } = this.$refs['questionn-aire']
            const value = {...this.fio, questionnaire }
            this.$modal.show(KlientReport, { value }, { width: '850', height: '500'})            
        },
        t(v) {
          return this.$t(`tabs.${v}`)
        }
    }
}
</script>
<style>
.klient .tabcontent {
    /* height: 315px; */
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #e1e1e1;
}
.klient label {
    padding: 0;
    padding-top: 5px;
    line-height: 15px;
    font-size: 14px;
}
</style>