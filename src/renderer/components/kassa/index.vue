<template>
    <div class="kassa">
        <b-card class="m-2" header-tag="header" footer-tag="footer" body-class="scroll-auto"
        :header="ok" :footer="total">
        <context class="row " :actions="{ add, print, remove }">
            <kassa-list :selected="selected" class="col-6" :rows="rows"
            :value="grope(dt.filter(isSame))" type="dt"/>
            <kassa-list :selected="selected" class="col-6" :rows="rows"
            :value="grope(ct.filter(isSame))" type='ct'/>
        </context>
        </b-card>
        <history class="col" :value="selected"/>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { summ, mult, diff, moment } from '@/functions'
import { KassaList, Context, PrixoRasxod, History } from './components'
import { Order } from '@/zvit'
export default {
    components: { KassaList, Context, History },
    provide() {
        return { select: this.select }
    },
    data() {
        return {
            selected: []
        }
    },
    watch: {
        date() {
            this.selected = []
        }
    },
    computed: {
        ...mapGetters({
            values: 'reestr/values',
            settings: 'settings',
            date: 'date',
            accounts: 'accounts'

        }),
        dt({ values, isSame }) {      
            return values.filter(v => v.dt === '301')
        },
        ct({ values, isSame }) {
            return values.filter(v => v.ct === '301')
        },
        ok({ settings, dt, ct, date }) {
            const isBefore = v => moment(v.date, 'L').isBefore(date, 'date')
            const debet = summ(...dt.filter(isBefore).map(v => v.summ))
            const credit = summ(...ct.filter(isBefore).map(v => v.summ))
            return summ(settings['ok'], debet, mult(credit, -1))
        },
        rows({ dt, ct, settings }) {
            const min = settings['minRows'] || 0
            const grope = v => this.grope(v.filter(this.isSame))           
            return Math.max( min, grope(dt).length, grope(ct).length )
        },

        total({ ok, dt, ct, isSame }) {
            const debet = summ(...dt.filter(isSame).map(v => v.summ))
            const credit = summ(...ct.filter(isSame).map(v => v.summ))
            return summ(ok, debet, mult(credit, -1))
        }
    },
    methods: {
        ...mapActions({
            remove: 'reestr/remove',
            saveReestr: 'reestr/save'
        }),
        save(v) {
            return this.saveReestr(v)
                .then(({ _id, values }) => this.select(_id, values))
        },
        add({ type }) {  

            this.$modal.show(PrixoRasxod, { type, save })
        },
        grope(v) {
            return [ ...v.reduce((cur, v) =>
                cur.set(v._id, [ ...cur.get(v._id) || [], v]), new Map())]       
        },
        isSame ({ date }) {
            return moment(date, 'L').isSame(this.date, 'date')
        },
        print(props) {
            this.$modal.show(Order, props, { width: '850', height: '500'})
        },
        select(id, values) {
            return this.selected = [id, values]
        }
    }
}
</script>

<style>
.kassa {
    padding: 0px;
    border: 1px solid rgba(0, 0, 0, 0.3);
}
.kassa .card {
    max-height: 330px;
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


