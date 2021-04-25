<template>
	<div class="kassa">
		<b-card class="mb-1" header-tag="header" footer-tag="footer" 
    body-class="scroll-auto"
    :footer-class="[toNumber(total) < 0 && 'danger']"
    :header-class="[toNumber(ok) < 0 && 'danger']"
		:header="ok" :footer="total">
		<div class="row mx-0">
			<kassa-list v-model="selected" class="col" :rows="rows" type="dt"/>
			<kassa-list v-model="selected"  class="col" :rows="rows" type="ct"/>
		</div>
		</b-card>
		<history :value="selected"/>
		<remove-dialog ref="remove-dialog"/>
		<order-dialog ref="order-dialog" :accounts="accounts"/>        
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { summ, mult, moment, toNumber } from '@/functions'
import components from './components'

export default {
  components,
  created() {
    this.update()
  },
  provide() {
    const { grope, addOrder, remove } = this
    const onStart = () => this.$emit('start')
    const onEnd = ([{ originalEvent }, v]) => 
      this.$emit('end', [originalEvent, v.ref ? this.map[v.ref] : v])
    return { grope, onStart, onEnd, actions: { addOrder, remove } }
  },
  data: () => ({
    selected: ''
  }),
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
    accounts({ company = {} }) {
      const accounts = company.accounts || {} 
      const account = (key) => (accounts[key] || [])
        .reduce((cur, { acc, title, summ }) => ({...cur, [acc]: {title, summ} }), {})
      return { dt: account('dt'), ct: account('ct') }
    },
    ok({ accounts, dt, ct, isBefore, deleted }) {
        const ok = {...accounts.dt['301']}.summ
        const debet = summ(...dt.filter(isBefore).filter(deleted).map(v => v.summ))
        const credit = summ(...ct.filter(isBefore).filter(deleted).map(v => v.summ))
        return summ(ok, debet, mult(credit, -1))
    },
    rows() {
      const dt = this.grope('dt')
      const ct = this.grope('ct')
      return Math.max( 8, dt.length, ct.length ) 
    },

    total({ ok, dt, ct, isSame, deleted }) {
      const debet = summ(...dt.filter(isSame).filter(deleted).map(v => v.summ))
      const credit = summ(...ct.filter(isSame).filter(deleted).map(v => v.summ))
      return summ(ok, debet, mult(credit, -1))
    }
  },
  methods: {
    ...mapActions({
      saveReestr: 'reestr/save',
      update: 'update'
    }),
    toNumber,
    async save(v) {
      const dt = v.values.map(v => v.dt === '301').includes(true) ? this.order['dt'] : false
      const ct = v.values.map(v => v.ct === '301').includes(true) ? this.order['ct'] : false
      const { _id } = await this.saveReestr({...v, order: { dt, ct } })
      return this.selected = _id
    },
    async addOrder(type) {
      const { show, close } = this.$refs['order-dialog']
      const order = await show(type)
      this.save(order).then(close)
    },
    remove(id) {
      return this.$refs['remove-dialog'].show(this.map[id])
    },
    grope(type) {
      const value = this[type].filter(this.isSame)
      return [ ...value.reduce((cur, v) =>
          cur.set(v._id, [ ...cur.get(v._id) || [], v]), new Map())]       
    },    
    isBefore({ date }) {
      return moment(date).isBefore(this.date, 'date')
    },
    isSame({ date }) {
      return moment(date).isSame(this.date, 'date')
    },
    deleted({ deleted }){
      return !deleted
    }
  }
}
</script>

<style scoped>

.kassa >>> .card {
    max-height: 325px;
}
.kassa >>> .card-body{
    flex: unset;
    padding: 0;
}
.kassa >>> .scroll-auto {
    overflow: auto;
    overflow-x:hidden;
    padding-top: 0 !important;
}
.kassa >>> .card-header, .card-footer {
    background-color: #eef1f3;
    text-align: right;
    border-top :none;
    border-bottom :none;
}
.kassa >>> .card-header .card-footer, .danger {
    color: brown;
}
.kassa >>> header, footer {
    border-radius: 0;
    padding: 8px;
}
</style>


