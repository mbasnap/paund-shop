<template> 
    <modal-editor :title="t(type)" @print="print" >
        <div :style="{ zoom }">
            <div ref="printer-content">
                <dt-order v-if="type === 'dt'" :date="date" :values="items"
                :bilet="bilet" :fullName="fullName" :order="order"/>
                <ct-order v-if="type === 'ct'" :date="date" :values="items"
                :bilet="bilet" :fullName="fullName" :order="order"/>
            </div>
        </div>
    </modal-editor>
</template>
<script>
import { mapGetters } from 'vuex'
import { moment, months, toNumber } from '@/functions'
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
            klients: 'klient/map',
            map: 'reestr/map',
            company: 'company'
        }),
        bilet({ map, _id  }) {
            return { ...map[_id] }
        },
        order({ bilet, values }) {            
            return { ...bilet.order }
        },
        date({ order }) {
            const date = moment(order.date)
            const day = date.format('DD')
            const month = months.format[date.month()]
            const year = date.format('YYYY')
            return `«${day}» ${month} ${year} г.`
        },
        items({ values }) {
            return values.filter(v => toNumber(v.summ))
        },
        fullName({ order }){
            const { to, from } = order
            return to || from || ''
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