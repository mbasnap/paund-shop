<template> 
    <modal-editor title="Kassa" :zoom="zoom" @zoom="onZoom" @print="print" >
        <div class="row p-3" :style="{ zoom: zoom + '%' }">
            <div class="col-2">
                <select class="custom-select mb-3" 
                :value="year.format('YYYY')"
                @change="v => selectYear(v.target)">
                    <option v-for="item in years" :key="item"
                    > {{ item }}
                    </option>
                </select>
                <ul class="list-group" v-for="item in months" :key="item">
                    <li :class="['list-group-item', { active: month.format('MMMM') === item }]"
                    @click="selectMonth(item)"
                    >{{ item }}</li>
                </ul>
            </div>
            <table-kassa ref="printer-content" class="col border-left" :value="days"/>
        </div>
    </modal-editor>
</template>
<script>
import { mapGetters } from 'vuex'
import { moment } from '@/functions'
import ModalEditor from '@/components/ModalPrint'
import TableKassa from './components/TableKassa'
export default {
    components: { ModalEditor, TableKassa },
    props: { value: Object },
    data() {
        return {
            selectedYear: '',
            selectedMonth: '',
            zoom: '65'
        }
    },
    computed: {
        ...mapGetters({ current: 'date' }),
        years() {
            return ['2017', '2018', '2019', '2020']
        },
        date({ current }) {
            return moment(current)
        },
        year({ selectedYear, date }) {
            const year = date.year()
            return moment(selectedYear || year, 'YYYY')
        },
        month({ year, selectedMonth, date }) {
            const month = date.month()
            return year.month(selectedMonth || month)
        },
        months({ year }) {
            const range = year.range('year')
            return [ ...range.by('months')].map(v => v.format('MMMM'))
        },
        days({ month }) {
            return month.range('month')
        },
        printContent({ $refs }) {
            return $refs['printer-content'].$el
        },
        disabled({ }) {}
    },
    methods: {
        t(v) {
            return this.$t('print.' + v)
        },
        selectYear({ value }) {
            this.selectedYear = value
        },
        selectMonth(v) {
            
            this.selectedMonth = v
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