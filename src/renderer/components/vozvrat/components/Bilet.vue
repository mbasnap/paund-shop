<template>
<div :class="['bilet', { disabled }]" style="font-size: 14px;">
  <table class="table table-sm table-bordered table-hover my-2"
  style="text-align:center;">
  <tbody>
    <tr v-for="({ title, count, summ }, i) in items" :key="i">
      <td style="text-align: left;">{{ title }}</td>
      <td>{{ count }}</td>
      <td style="text-align: right;">{{ summ }}</td>
    </tr>
    <slot></slot>
  </tbody>
</table>
</div>
</template>

<script>
import mix from '@/widgets/named-input/mix.js'
import { mapGetters } from 'vuex'
import { proc, daysDiff, toNumber, toDouble,  moment } from '@/functions'
export default {
  props: {
    value: { type: Object,
      default() {
        return {}
      }
    },
    disabled: Boolean
  },
  mixins: [ mix ],
  computed: {
    ...mapGetters({
        date: 'date',
        company: 'company'
    }),
    type({ value }) {
      return value.zalog
    },
    days({ value, date }) {
        return daysDiff(date, value.date) || 1
    },
    daysBefore({ date, value }) {
      if (!value.date) return
      const plan = moment(value.date).add(value.days, 'd')
      const res = daysDiff(plan, date)
      return res < 0 ? 0 
        : res === toNumber(value.days) ? res - 1
          : res < toNumber(value.days) ? res : 0
    },
    statmentDays({ date: fact, value }) {
      const { date, days } = { ...value.statment}
      if(!date) return
      const res = daysDiff(fact, date)
      return res < 0 ? 0 
        : res <= toNumber(days) ? res : days
    },
    datePlan({ value }) {
      return moment(value.date).add(value.days, 'd')
    },
    daysAfter({ date, datePlan, statmentDays = 0 }) {
      const res = daysDiff(date, datePlan) - statmentDays 
      return res < 0 ? 0 :  res
    },
    ocenca({ value }) {
      return toDouble(value.ocenca)
    },
    xProc({ value }) {
        const { procent, days } = value
        return toDouble(toNumber(procent) / toNumber(days))
    },
    xStatment({ value }) {
        const { procent, discount, days } = value
        return toDouble((toNumber(procent) + toNumber(discount)) / toNumber(days))
    },
    xPen({ value }) {
      const { ocenca, discount, xPen } = value
      return toDouble((toNumber(ocenca) + toNumber(discount)) * xPen / 100)
    },
    minProcent({ value, xProc, daysBefore, company }) {
      const { min } = {...company.procent }
      const procent = toNumber(value.procent) - (xProc * daysBefore)
      return procent < min ? toDouble(min) : 0
    },
    procent({ xProc: value, daysBefore: count, minProcent }) {
      const procent = !minProcent ? value * count
        : toNumber(this.value.procent) - minProcent
      return { minProcent, value, count, summ: toDouble(procent)}
    },
    penalty({ xPen: value, daysAfter: count }) {
      return { value, count, summ: toDouble(value * count)}
    },
    statment({ xStatment: value, statmentDays: count }) {
      return { ...this.value.statment, count, value, summ: toDouble(value * count) }
    },
    total({ ocenca, procent, penalty, statment }) {
      const total = toNumber(ocenca) - toNumber(procent.summ)
      return toDouble(total + toNumber(statment.summ) + toNumber(penalty.summ))
    },
    items({ value, statment, penalty, ocenca, procent, days, daysBefore, daysAfter, datePlan, total, t }) {
      return [
        { title: moment(value.date).format('L'), count: datePlan.format('L'), summ: ocenca },
        { title: `${t('procent')} ${value.xProc}%`, count: `${value.days}дн.`, summ: value.procent },
        { title: `${t('discount')}`, count: `${value.xDisc}%`, summ: value.discount },
        { title: `${t('statment')} ${value.xProc}`, count: `${statment.count}дн.`, summ: statment.summ },
        { title: `${t('penalty')} ${value.xPen}%`, count: `${daysAfter}дн.`, summ: penalty.summ },
        { title: `${t('pereraschet')} ${value.xProc}%`, count: `${daysBefore}дн.`, summ: procent.summ },
        { title: `${t('total')}`, count: `${days}дн.`, summ: total },
    ]
    .filter(v => toNumber(v.summ))
    },
    number({ value }) {
      return value.number
    },
    model({ value, type: zalog, ocenca, procent, penalty, statment, total }) {
      const { _id: ref, number } = value
      return { ref, number, zalog, ocenca, procent, penalty, statment, total,
        values: [
          { dt: '301', ct: '377', summ: ocenca },
          { dt: '301', ct: '703', ...statment }, // ct 301 if return procent statment
          { dt: '703', ct: '301', ...procent }, // ct 301 if return procent
          { dt: '301', ct: '704', ...penalty }
        ].filter(v => toNumber(v.summ)) }
    }
  },
  methods: { moment, toNumber,
    addStatment({ value: days }) {
      const statment = days > 0 ? { days, date: this.date } : false
      this.$emit('change', {...this.value, statment })
    },
    t(v) {
      return this.$t(`vozvrat.${v}`)
    }
  } 
}
</script>

<style></style>