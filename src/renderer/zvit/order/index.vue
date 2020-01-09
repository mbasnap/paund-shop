<template> 
    <modal-editor :title="t(type)" @print="print" >
        <div :style="{ zoom }">
            <div ref="printer-content">
                <dt-order v-if="type === 'dt'" :date="date" :values="values"
                :bilet="bilet" :klient="klient" :order="order"/>
                <ct-order v-if="type === 'ct'" :date="date" :values="values"
                :bilet="bilet" :klient="klient" :order="order"/>
            </div>
        </div>
    </modal-editor>
</template>
<script>
import { mapGetters } from 'vuex'
import { moment, months } from '@/functions'
import ModalEditor from '@/components/ModalPrint'
import DtOrder from './DtOrder'
import CtOrder from './CtOrder'
export default {
    components: { ModalEditor, DtOrder, CtOrder },
    props: { _id: String, values: Array, type: String },
    data() {
        return {
            zoom: '85%'
        }
    },
    computed: {
        ...mapGetters({
            klients: 'klient/klients',
            dt001: 'reestr/dt001',
            dt002: 'reestr/dt002',
            ct002: 'reestr/ct002',
            company: 'company'
        }),
        bilet({ dt001, _id  }) {
            return { ...dt001[_id] }
        },
        order({ dt002, ct002, _id }) {
            const order = { ...dt002, ...ct002 }
            return { ...order[_id] }
        },
        date({ order }) {
            const date = moment(order.date, 'L')
            const day = date.format('DD')
            const month = months.format[date.month()]
            const year = date.format('YYYY')
            return `«${day}» ${month} ${year} г.`
        },
        klient({ order, klients }){
            const { to, from } = order
            return { ...klients[to || from] }
        },
        printContent({ $refs }) {
            return $refs['printer-content']
        },
        disabled({ }) {}
    },
    methods: {
        t(v) {
            return this.$t('order.' + v)
        },
        onZoom({ value }) {
            this.zoom = value + ''    
        },
        print({ send }) {
            const { outerHTML: content } = this.printContent
            send("print", { content, size: 'landscape' })
        }
    }
}
</script>
<style>
.print-only {
    display: none;
}
</style>