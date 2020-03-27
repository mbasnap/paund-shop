<template> 
<modal-editor class="klient"
    ref="modal-editor" :title="t(title)" @save="save(data).then(close)">
    <div class="tabs" >
        <a v-for="(item) in tabs" :key="item" :class="{ active: activetab === item }"
        @click="activetab = item"> {{ t(item) }} </a>
        <div class="row">
            <div class="col"><svg-print width="25px;" style="text-align: right;"
            @click="print"/> </div>
        </div> 
    </div>
    <div class="content">
        <tab-content v-model="fio" v-show="activetab === 'fio'" tabname="fio"
        :items="['family', 'name', 'sername', 'city', 'bithday']">
            <svg-trash class="mt-3" width="20px" style="text-align: right;" @click="removeKlient"/>          
        </tab-content>
        <tab-content v-model="passport"  v-show="activetab === 'passport'" tabname="passport"
        :items="['nationality', 'seria', 'number', { name: 'issued', teg: 'textarea'}, 'date-issue', 'idn']">
            <svg-address-card width="25px" @click="addPassport"/>          
        </tab-content>
        <tab-content v-model="address"  v-show="activetab === 'address'" tabname="address"
        :items="['city', 'street', 'home', 'phone']">
        </tab-content>
        <questionn-aire v-model="questionnaire"  v-show="activetab === 'questionnaire'"/>
    </div>
</modal-editor>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import { SvgTrash, SvgPrint, SvgAddressCard } from '@/svg'
import ModalEditor from '@/widgets/Modal.vue'
// import { PostCity } from './index'
import KlientReport from '@/zvit/klient'
import TabContent from './TabContent'
import QuestionnAire from './QuestionnAire'
export default {
    components: { ModalEditor, SvgAddressCard, SvgTrash, SvgPrint, TabContent, QuestionnAire },
    props: { title: String, value: Object },
    created() {
        this.data = {...this.data, ...this.value}
    },
    data() {
        return {
            tabs: ['fio', 'passport', 'address', 'questionnaire'],
            activetab: 'fio',
            data: {
                questionnaire: {
                    "objective of referral": "receive financial credit",
                    "source of money": "salary",
                    "average monthly income": "income2",    
                    "financial status type": "movable and immovable property",    
                    "business reputation": "positive",
                    "beneficial": "do not have third-party benefits",
                    "public official": "not public official",
                    "information about representative": "have",
                    "information about representative": "have",
                    "level risk": "low",
                }
            }
        }
    },
    computed: {
      ...mapGetters('klient', ['map', 'docs', 'group']),
        fio: {
            get() {
                return this.data
            },
            set({ name, value }) {
                this.data = {...this.data, [name]: value } 
            }
        },
        passport: {
            get() {
                return {...this.data.passport}
            },
            set({ name, value }) {
                const passport = {...this.passport, [name]: value }
                this.data = {...this.data, passport } 
            }
        },
        address: {
            get() {
                return {...this.data.address}
            },
            set({ name, value }) {
                const address = {...this.address, [name]: value }
                this.data = {...this.data, address } 
            }
        },
        questionnaire: {
            get() {
                return {...this.data.questionnaire}
            },
            set({ name, value }) {
                const questionnaire = {...this.questionnaire, [name]: value }
                this.data = {...this.data, questionnaire } 
            }
        },
        err() {
            return {  }
        }
    },
    methods: {
        ...mapActions('klient', ['save', 'remove']),
        addPassport() {
            const { _id, passport, address } = {}
            this.data = {...this.data, _id, passport, address }
        },
        removeKlient() {
            this.remove(this.data).then(this.close)
        },
        close() {
            this.$refs['modal-editor'].close()
        },
        print() {
            const value = this.data
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