<template>
    <table class="kassa table table-striped table-sm">
    <thead>
        <tr>
        <th scope="col">{{ t('date') }}</th>
        <th scope="col">{{ t('prixod') }}</th>
        <th scope="col">{{ t('ssuda') }}</th>
        <th scope="col">{{ t('procent') }}</th>
        <th scope="col">{{ t('penalty') }}</th>
        <th scope="col">{{ t('totalDt') }}</th>
        <th scope="col">{{ t('rasxod') }}</th>
        <th scope="col">{{ t('ssuda') }}</th>
        <th scope="col">{{ t('procent') }}</th>
        <th scope="col">{{ t('penalty') }}</th>
        <th scope="col">{{ t('totalCt') }}</th>
        <th scope="col">{{ ok }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(date, index) in days" :key="index">
            <th scope="row">{{ date }}</th>
            <td>{{ prixod(same(date)) }}</td>
            <td>{{ ct('377', same(date)) }}</td>
            <td>{{ ct('703', same(date)) }}</td>
            <td>{{ ct('704', same(date)) }}</td>
            <th>{{ totalDt(same(date)) }}</th>
            <td>{{ rasxod(same(date)) }}</td>
            <td>{{ dt('377', same(date)) }}</td>
            <td>{{ dt('703', same(date)) }}</td>
            <td>{{ dt('704', same(date)) }}</td>
            <th>{{ totalCt(same(date)) }}</th>
            <th>{{ getOk(isSameOrBefore(date)) }}</th>
        </tr>
        <tr>
            <th scope="row"></th>
            <td>{{ prixod(monthFilter) }}</td>
            <td>{{ ct('377', monthFilter) }}</td>
            <td>{{ ct('703', monthFilter) }}</td>
            <td>{{ ct('704', monthFilter) }}</td>
            <th>{{ totalDt(monthFilter) }}</th>
            <td>{{ rasxod(monthFilter) }}</td>
            <td>{{ dt('377', monthFilter) }}</td>
            <td>{{ dt('703', monthFilter) }}</td>
            <td>{{ dt('704', monthFilter) }}</td>
            <th>{{ totalCt(monthFilter) }}</th>
            <th></th>
        </tr>
    </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex'
import { summ, mult, moment } from '@/functions'
export default {
    props: { value: Object },
    computed: {
        ...mapGetters({
            values: 'reestr/values',
            settings: 'settings',
        }),
        accaunts() {
            return ['377', '703', '704']
        },
        days({ value }) {
            return [ ...value.by('days')].map(v => v.format('L'))
        },
        ok({ value, isSameOrBefore }) {
            return this.getOk(v => moment(v.date, 'L').isBefore(value.start))
        },
        dt301({ values }) {
            return values.filter(({ dt }) => dt === '301')
        },
        ct301({ values }) {
            return values.filter(({ ct }) => ct === '301')
        }
    },
    methods: {
        same(date) {
            return v => v.date === date
        },
        isSameOrBefore(v) {
            const date = moment(v, 'L')
            return v => moment(v.date, 'L').isSameOrBefore(date)
        },
        monthFilter({ date }) {
            const { start, end } = this.value
            return moment(date, 'L').isBetween(start, end, 'day', '[]')
        },
        prixod(filter) {
            const values = this.dt301.filter(filter)
              .filter(({ ct }) => !this.accaunts.includes(ct))
            return summ( ...values.map(v => v.summ))
        },
        rasxod(filter) {
            const values = this.ct301.filter(filter)
              .filter(({ dt }) => !this.accaunts.includes(dt))
            return summ( ...values.map(v => v.summ))
        },
        dt(acc, filter) {
            const values = this.values.filter(({ dt }) => dt === acc)
            return summ( ...values.filter(filter).map(v => v.summ))
        },
        ct(acc, filter) {
            const values = this.values.filter(({ ct }) => ct === acc)
            return summ( ...values.filter(filter).map(v => v.summ))
        },
        totalDt(filter) {
            const values = this.dt301.filter(filter)
            return summ( ...values.map(v => v.summ))
        },
        totalCt(filter) {
            const values = this.ct301.filter(filter)
            return summ( ...values.map(v => v.summ))
        },
        getOk(filter) {
            const ok = this.settings['ok']
            const dt = this.totalDt(filter)
            const ct = mult(this.totalCt(filter), -1)
            return summ(ok, dt, ct)
        },
        t(v) {
            return this.$t('zvit.' + v)
        }
    }

}
</script>

<style>
.kassa.table {
    width: 1000px;
    overflow: hidden;
}
/* .table td.fit, 
.table th.fit {
    white-space: nowrap;
    width: 1%;
} */
.fixed_header{
    /* width: 400px; */
    /* table-layout: fixed;
    border-collapse: collapse; */
}

.fixed_header tbody{
  display:block;
  width: 100%;
  overflow: auto;
  /* overflow-y: scroll; */
  /* height: 600px; */
}

.fixed_header thead tr {
   display: block;
}

.fixed_header thead {
  /* background: black;
  color:#fff; */
}

.fixed_header th, .fixed_header td {
  /* padding: 5px;
  text-align: left;
  width: 200px; */
}
</style>