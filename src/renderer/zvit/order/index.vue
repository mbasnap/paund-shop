<template> 
    <!-- <modal-editor :title="t(type)" @print="print" >
        <div :style="{ zoom }"> -->
            <div ref="printer-content">
                <order :title="t(type)" :type="type" :date="date" :value="model"/>
            </div>
        <!-- </div>
    </modal-editor> -->
</template>
<script>
import { mapGetters } from 'vuex'
import { moment, months, toNumber } from '@/functions'
import ModalEditor from '@/components/ModalPrint'
// import DtOrder from './DtOrder'
// import CtOrder from './CtOrder'
import Order from './Order'
export default {
    components: { ModalEditor, Order },
    props: { value: Object },
    data() {
        return {
            zoom: '85%'
        }
    },
    computed: {
        model({ value }) {
            return {...value }
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
        }
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
            send("print", { content, zoom: '115%', silent: true})
            // send("print", { content, zoom: '150%', silent: true, size: 'landscape' })
        }
    }
}
</script>
<style>
.print-only {
    display: none;
}
</style>