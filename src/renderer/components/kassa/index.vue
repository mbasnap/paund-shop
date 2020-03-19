<template>
    <div class="kassa">
        <b-card class="m-2" header-tag="header" footer-tag="footer" body-class="scroll-auto"
        :header="ok" :footer="total">
        <context class="row " :actions="{ addOrder, print }">
            <kassa-list :selected="selected" class="col-6" :rows="rows"
            :value="grope(dt.filter(isSame))" type="dt"/>
            <kassa-list :selected="selected" class="col-6" :rows="rows"
            :value="grope(ct.filter(isSame))" type='ct'/>
        </context>
        </b-card>
        <history ref="history" class="col" :value="selected"
        @remove="remove" @printBilet="printBilet" @printOrder="printOrder" />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { summ, mult, diff, moment } from '@/functions'
import { KassaList, Context, PrixoRasxod, History } from './components'
import { Bilet, Order } from '@/zvit'
export default {
    components: { KassaList, Context, History },
    created() {
      this.update()
    },
    provide() {
        const onStart = () => this.$emit('start')
        const onEnd = () => this.$emit('end')
        return { select: this.select, onStart, onEnd }
    },
    data() {
        return {
            selected: ''
        }
    },
    watch: {
        date() {
            this.selected = ''
        }
    },
    computed: {
        ...mapGetters({
            map: 'reestr/map',
            dt: 'reestr/dt301',
            ct: 'reestr/ct301',
            company: 'company',
            date: 'date',
            order: 'reestr/nextOrder'
        }),
        accounts({ company }) {
            const reduce = key => ({...company.accounts}[key] || [])
                .reduce((cur, v) => ({...cur, [v.acc]: v }), {})
            return { dt: reduce('dt'), ct: reduce('ct') }
        },
        ok({ accounts, dt, ct, date }) {
            const ok = {...accounts.dt['301']}.summ
            const isBefore = v => moment(v.date).isBefore(date, 'date')
            const debet = summ(...dt.filter(isBefore).map(v => v.summ))
            const credit = summ(...ct.filter(isBefore).map(v => v.summ))
            return summ(ok, debet, mult(credit, -1))
        },
        rows({ dt, ct, company }) {
            const { kassa } = {...company.rows}
            const grope = v => this.grope(v.filter(this.isSame))                
            return Math.max( kassa || 0, grope(dt).length, grope(ct).length ) 
        },

        total({ ok, dt, ct, isSame }) {
            const debet = summ(...dt.filter(isSame).map(v => v.summ))
            const credit = summ(...ct.filter(isSame).map(v => v.summ))
            return summ(ok, debet, mult(credit, -1))
        }
    },
    methods: {
        ...mapActions({
            removeReestr: 'reestr/remove',
            saveReestr: 'reestr/save',
            update: 'update'
        }),
        async save(v) {
            const dt = v.values.map(v => v.dt === '301').includes(true) ? this.order['dt'] : false
            const ct = v.values.map(v => v.ct === '301').includes(true) ? this.order['ct'] : false
            return this.saveReestr({...v, order: { dt, ct } }).then( v => this.select(v.id))

        },
        async remove(v) {
            await this.removeReestr(v)
            return this.select()
        },
        print({ type, values }) {
            const { model, getTitle } = this.$refs['history']
            const order = {...model.order}[type]
            values = values.map(v => ({ ...v, title: getTitle(v)}))
            this.printOrder({value: {...model, type, order, values }})
        },
        addOrder({ type }) {  
            this.$modal.show(PrixoRasxod, { type, save: this.save })
        },
        grope(v) {
            return [ ...v.reduce((cur, v) =>
                cur.set(v._id, [ ...cur.get(v._id) || [], v]), new Map())]       
        },
        isSame({ date }) {
            return moment(date).isSame(this.date, 'date')
        },
        printOrder(props) {
            this.$modal.show(Order, props, { width: '850', height: '500'})
        },
        printBilet(v) {     
            const ref = {...this.map[v.ref], date: v.date }
            this.$modal.show(Bilet, { value: {...v, ...ref} }, { width: '800', height: '550'})
        },
        select(id) {      
            // console.log(id);
             
            return this.selected = id
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


