<template>
  <div v-if="bilet._id" class="history">
    <ul class="history__item">
      <li class="row m-0">
        <div  class="col p-0">
          <strong v-if=" model.number">Билет № {{ model.number }}</strong>
        </div>
        <div class="col-1 p-0" style="text-align: center;">
          <svg-print width="20px;" @click="print"/>
        </div>
      </li>
      <li class="row m-0" >
        <div class="col p-0">{{ model.from }}</div>
      </li>
      <li class="row m-0" v-for="(v, i) in model.values" :key="i">
        <div class="col p-0"> {{ getTitle(v) }} </div>
        <div class="col-4 p-0" style="text-align: right;">{{ v.summ }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { toNumber, moment } from '@/functions'
import { BiletOrder } from '@/zvit'
import { SvgPrint } from '@/svg'
export default {
    components: { SvgPrint },
    props: { value: String },
    computed: {
        ...mapGetters({
            map: 'reestr/map',
            klients: 'klient/map',
            company: 'company',
            users: 'users',
            used: 'reestr/used'
        }),
        accounts({ company }) {
            const reduce = key => ({...company.accounts}[key] || [])
                .reduce((cur, { acc, title }) => ({...cur, [acc]: title }), {})
            return { dt: reduce('dt'), ct: reduce('ct')}
        },
        bilet({ value, map }) {
            return map[value] || {}
        },
        klient({ bilet, klients, users}) {
            const { klient } = bilet
            const usersFio = users.reduce((cur, { _id, fio }) => ({...cur, [_id]: fio }), {})
            return {...klients[klient], ...usersFio[klient]}
        },
        from({ klient }) {
            const { family = '', name = '', sername = '' } = klient
            return `${family} ${name} ${sername}`
        },
        order({ bilet }) {
            return {...bilet.order}
        },
        doc({ klient }) {
            return { ...klient.passport}
        },
        model({ bilet, klient, doc, from, company }) {
            const date = moment(bilet.date).format('L')
            const time = moment(bilet.date).format('hh: mm')
            const returnDate = moment(bilet.date).add(bilet.days, 'd').format('L')
            return { ...bilet, klient, doc, from, date, time, returnDate, company }
        }
    },
    methods: {
        getTitle(value) {
            const [k] = ['dt', 'ct'].filter(k => value[k] !== '301')
            const acc = this.accounts[k]
            return `${this.getOrder(k == 'dt' ? 'ct' : 'dt')} ${acc[value[k]]}`
        },
        getOrder(k) {
            return `${this.t('order', k + '-short')} №${this.order[k]}`
        },
        printOrder(props) {
            this.$modal.show(Order, props, { width: '850', height: '500'})
        },
        print() {
            console.log(this.model);
            this.$modal.show(BiletOrder, { value: this.model }, { width: '850', height: '500'})
        },
        t(name, value) {
            return this.$t(`${name}.${value}`)
        }
    }
}
</script>

<style scoped>
.history {
  font-size: 14px !important;
}
</style>