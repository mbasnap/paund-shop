<template> 
    <modal-editor :title="t('title', 'klient-report')" @print="print" >
        <div ref="printer-content" class="border p-5" style="font-size: 20px;">
            <div v-for="([key, items]) in Object.entries(tabs)" :key="key" 
            class="">
                <div v-for="name in items" :key="name" class="row p-3 ">
                    <div class="col-5 ">{{ t(key, name) }}</div>
                    <div class="col border-bottom">{{ get(key, name) }}</div>
                </div>
            </div>
        </div>
    </modal-editor>
</template>
<script>
import ModalEditor from '@/components/ModalPrint'

export default {
    components: { ModalEditor },
    props: { value: Object },
    data() {
        return {
            tabs: { 
                'fio': ['family', 'name', 'sername', 'city', 'bithday'], 
                'passport': ['seria', 'number', 'issued', 'date-issue', 'idn'],
                'address': ['post', 'city', 'street', 'home', 'phone' ],
            },
        }
    },
    computed: {
        fio() {
            return {...this.value }
        },
        passport() {
            return {...this.value.passport }
        },
        address() {
            return {...this.value.address }
        }
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
            send("print", { content })
        }
    }
}
</script>
<style>
.print-only {
    display: none;
}
</style>