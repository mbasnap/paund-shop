<template> 
    <modal-editor title="Kassa" :disabled="disabled"  >
        <div class="row p-3" style="zoom: 75%;">
            <div class="col-2">
                <select class="custom-select mb-3">
                    <option v-for="item in years" :key="item"
                    :selected="Number(item) === currentYear"
                    @click="selectYear(item)"> {{ item }}
                    </option>
                </select>
                <ul class="list-group" v-for="(item, index) in months" :key="index">
                    <li :class="['list-group-item', { active: currentMonth === index }]"
                    @click="selectMonth(index)"
                    >{{ item }}</li>
                </ul>
            </div>
            <table-kassa class="kassa col border-left" :value="days"/>
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
            selectedMonth: -1
        }
    },
    computed: {
        ...mapGetters({
            date: 'date',
        }),
        years({ date }) {
            return ['2017', '2018', '2019', '2020']
        },
        currentYear({ selectedYear, date }) {
            const year = moment(date).year()
            return selectedYear || year
        },
        currentMonth({ selectedMonth, date }) {
            const month = moment(date).month()
            return selectedMonth >= 0  ?  selectedMonth : month
        },
        year({ currentYear }) {
            return moment(currentYear, 'YYYY');
        },
        month({ currentMonth }) {
            return moment().month(currentMonth);
        },
        days({ month }) {
            return month.range('month')
        },
        months({ year }) {
            const range = year.range('year')
            return [ ...range.by('months')].map(v => v.format('MMMM'))
        },
        disabled({ }) {}
    },
    methods: {
        t(v) {
            return this.$t('print.' + v)
        },
        selectYear(v) {
            this.selectedYear = v
        },
        selectMonth(v) {
            this.selectedMonth = v
        },
    }
}
</script>
<style>
.print-only {
    display: none;
}
</style>