<template> 
    <modal-editor :title="t(type)" @print="print" >
        <div :style="{ zoom }">
            <div ref="printer-content">
                <dt-order v-if="type === 'dt'" :date="date" :value="model"/>
                <ct-order v-if="type === 'ct'" :date="date" :value="model"/>
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
        model({ value }) {
            return {...value}
        },
        date({ model }) {
            const date = moment(model.date, 'L')
            const day = date.format('DD')
            const month = months.format[date.month()]
            const year = date.format('YYYY')

            return `«${day}» ${month} ${year} г.`
        },
        type({ model }) {
            return model.type
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