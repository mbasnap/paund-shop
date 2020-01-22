<template> 
    <modal-editor :title="t(type)" @print="print" >
        <div :style="{ zoom }">
            <div ref="printer-content">
                <dt-order v-if="type === 'dt'" :date="date" :value="value"/>
                <ct-order v-if="type === 'ct'" :date="date" :value="value"/>
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
    props: { value: Object },
    data() {
        return {
            zoom: '85%'
        }
    },
    computed: {
        date({ value }) {
            const date = moment(value.date, 'L')
            const day = date.format('DD')
            const month = months.format[date.month()]
            const year = date.format('YYYY')
            return `«${day}» ${month} ${year} г.`
        },
        type({ value }) {
            return value.type
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