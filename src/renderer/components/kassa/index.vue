<template>
    <b-card class="kassa" header-tag="header" footer-tag="footer" body-class="scroll-auto"
    :header="formated(settings['ok'])" :footer="formated(total)">
    <context class="row " :actions="{ add, edit, remove }">
        <kassa-list class="col-6" :value="grope(dt)" :rows="rowsLength"/>
        <kassa-list class="col-6" :value="grope(ct)" :rows="rowsLength"/>
    </context>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { summ, diff, moment } from '@/functions'
import { KassaList, Context } from './components'
export default {
    components: { KassaList, Context },
    computed: {
        ...mapGetters({ values: 'reestr/values', settings: 'settings', date: 'date' }),

        dt ({ values, byDate }) {
            return values.filter(v => v.dt === '301').filter(byDate)
        },
        ct ({ values, byDate }) {
            return values.filter(v => v.ct === '301').filter(byDate)
        },
        rowsLength({ grope, dt, ct, settings }) {
            return Math.max( settings['minRows'], grope(dt).length, grope(ct).length )
        },
        total({ dt, ct, settings }) {
            const totalDt = dt.reduce((cur, v) => summ(cur, v.summ), 0)
            const totalCt = ct.reduce((cur, v) => summ(cur, v.summ), 0)
            return summ(settings['ok'], diff(totalDt, totalCt))
        }
    },
    methods: {
        ...mapActions('reestr', ['remove']),
        grope(v) {
            return [...v.reduce((cur, v) =>
                cur.set(v._id, [ ...cur.get(v._id) || [], v]), new Map())]          
        },
        byDate ({ date }) {
            return date === moment(this.date).format('L')
        },
        formated(number) {
            return this.$numberFormat(number, 2, ',', ' ')
        },
        add() {},
        edit() {}
    }
}
</script>

<style>
.kassa {
    padding: 0px;
    border: 1px solid rgba(0, 0, 0, 0.3);
}
.kassa .card-body{
    flex: unset;
    padding: 0;
}
.scroll-auto {
    overflow: auto;
    overflow-x:hidden;
    padding-top: 0 !important;
}
.card-header, .card-footer {
    background-color: #eef1f3;
    text-align: right;
}
</style>


