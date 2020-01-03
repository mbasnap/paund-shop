<template>
    <b-card class="kassa" header-tag="header" footer-tag="footer" body-class="scroll-auto"
    :header="ok" :footer="total">
    <context class="row " :actions="{ add, print, remove }">
        <kassa-list class="col-6" :value="grope(dt.filter(byDate))" :rows="rowsLength" type="dt"/>
        <kassa-list class="col-6" :value="grope(ct.filter(byDate))" :rows="rowsLength" type="ct"/>
    </context>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { summ, diff, moment } from '@/functions'
import { KassaList, Context, PrixoRasxod } from './components'
import { Bilet } from '@/zvit'
export default {
    components: { KassaList, Context },
    computed: {
        ...mapGetters({
            values: 'reestr/values',
            settings: 'settings',
            date: 'date'
        }),
        dt({ values }) {            
            return values.filter(v => v.dt === '301')
        },
        ct({ values }) {
            return values.filter(v => v.ct === '301')
        },
        ok({ settings, dt, ct, date }) {
            const byDate = v => moment(v.date, 'L').diff(date, 'd') < 0
            const ok = settings['ok']
            const debet = summ(...dt.filter(byDate).map(v => v.summ))
            const credit = summ(...ct.filter(byDate).map(v => v.summ)) * -1
            return summ(ok, debet, credit)
        },
        rowsLength({ grope, dt, ct, settings, byDate }) {
            const length = v => grope(v.filter(byDate)).length
            return Math.max( settings['minRows'], length(dt), length(ct) )
        },
        total({ ok, dt, ct, byDate }) {
            const debet = summ(...dt.filter(byDate).map(v => v.summ))
            const credit = summ(...ct.filter(byDate).map(v => v.summ))
            return summ(ok, diff(debet, credit))
        }
    },
    methods: {
        ...mapActions('reestr', ['remove', 'save']),
        add ({ type }) {        
            this.$modal.show(PrixoRasxod, { type, save: this.save }, { height: '300px' })
        },
        grope(v) {
            return [ ...v.reduce((cur, v) =>
                cur.set(v._id, [ ...cur.get(v._id) || [], v]), new Map())]       
        },
        byDate ({ date }) {
            return date === moment(this.date).format('L')
        },
        print(value) {
            this.$modal.show(Bilet, { value }, { height: '550px', width: '800px'})
        }
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


