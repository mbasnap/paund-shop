<template> 
    <modal-editor :title="t('title', 'klient-report')" @print="print" >
        <!-- <div ref="printer-content" class="border p-5" style="font-size: 20px;">
            <div v-for="([key, items]) in Object.entries(tabs)" :key="key" 
            class="">
                <div v-for="name in items" :key="name" class="row p-3 ">
                    <div class="col-5 ">{{ t(key, name) }}</div>
                    <div class="col border-bottom">{{ get(key, name) }}</div>
                </div>
            </div>
        </div> -->
    <div class="tabs" >
        <a v-for="(item) in tabs" :key="item" :class="{ active: activetab === item }"
        @click="activetab = item" > {{ t('tabs', item) }} </a>
    </div>
    <div class="content" ref="printer-content">
        <div class="tabcontent" v-show="activetab === 'questionnaire'" >
            <questionnaire  :value="value"/>
        </div>
        <div class="tabcontent" v-show="activetab === 'questionnaire2'" >
            <questionnaire-two  :value="value"/>
        </div>
    </div>
    </modal-editor>
</template>
<script>
import ModalEditor from '@/components/ModalPrint'
import Questionnaire from './Questionnaire'
import QuestionnaireTwo from './QuestionnaireTwo'
export default {
    components: { ModalEditor, Questionnaire, QuestionnaireTwo },
    props: { value: Object },
    data() {
        return {
            activetab: 'questionnaire',
            tabs: ['questionnaire', 'questionnaire2']
            // tabs: { 
            //     'fio': ['family', 'name', 'sername', 'city', 'bithday'], 
            //     'passport': ['seria', 'number', 'issued', 'date-issue', 'idn'],
            //     'address': ['post', 'city', 'street', 'home', 'phone' ],
            // },
        }
    },
    computed: {
        // fio() {
        //     return {...this.value }
        // },
        // passport() {
        //     return {...this.value.passport }
        // },
        // address() {
        //     return {...this.value.address }
        // }
    },
    methods: {
        get(key, name) {
            return this[key][name]
        },
        t(name, value) {
          return this.$t(`${name}.${value}`)
        },
        print({ send }) {
            const { outerHTML: content } = this.$refs['printer-content']
            send("print", { content, zoom: '150%', silent: true  })
        }
    }
}
</script>
<style>
.print-only {
    display: none;
}
</style>