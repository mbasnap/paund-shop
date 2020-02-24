<template>
<div :class="['bilet', { disabled }]" style="font-size: 14px; text-align: right;">
      <div class=" form-row mb-2" >
        <span class="col-2"> {{ t('ocenca') }} </span>
        <div class="value col">
          {{ moment(value.date).format('L') }} x {{ value.days }}дн
        </div>
        <div class="value col-4 border-left">{{ ocenca }}</div>
      </div>

      <div class=" form-row mb-2" style="text-align: left">
        <div class="col-5">
          <div class="row m-0">
            <div class="col p-0">Процент {{ value.xProc }} %</div>
            <div class="col-3 p-0">{{ value.procent }}</div>
          </div>
        </div>
        <div v-show="toNumber(value.discount)" class="col-5">
          <div class="row m-0">
            <div class="col p-0">Скидка {{ value.xDisc }} %</div>
            <div class="col-3 p-0">{{ value.discount }}</div>
          </div>
        </div>
      </div>
      <div v-show="daysBefore && toNumber(procent.summ)" class="form-row mb-2" style="color: #860d0d;">
        <div class="col-2"> {{ t('pereraschet') }} </div>
        <div v-if="!minProcent" class="value col">{{ xProc }} x {{ daysBefore }} дн</div>
        <div v-else class="value col">{{ minProcent }} min%</div>
        <div class="col-4 border-left">{{ procent.summ }}</div>
      </div>
      <div v-show="statmentDays" class="form-row mb-2">
        <div class="col-4" style="text-align: left"> {{ t('statment') }} {{ value.xProc}} % </div>
        <div class="value col">{{statment.value}} x {{statment.count}} дн</div>
        <div class="col-4 border-left">{{statment.summ}}</div>
      </div>
      <div v-show="daysAfter" class="form-row mb-2">
        <div class="col-3" style="text-align: left"> {{ t('penalty') }} {{ value.xPen }} % </div>
        <div class="value col">{{xPen}} x {{daysAfter}} дн</div>
        <div class="col-4 border-left">{{penalty.summ}}</div>
      </div>
      <div class=" form-row mb-2">
        <div class="col-2" style="text-align: left"> <strong>{{ t('total') }}</strong> </div>
        <div class="value col">
          {{ moment(value.date).add(value.days, 'd').add(statment.days, 'd').format('L') }} {{ days }} дн
        </div>
        <div class="value col-4 border-left" style="font-weight: 500;">{{ total }}</div>
      </div>
</div>
</template>

<script>
import mix from '@/widgets/named-input/mix.js'
// import StatmentRow from './StatmentRow.vue'
import { mapGetters, mapActions } from 'vuex'
import { proc, daysDiff, toNumber, toDouble, mult, diff, moment } from '@/functions'
// import { settings } from 'cluster'
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
    // components: { StatmentRow },
    computed: {
      ...mapGetters({
          date: 'date',
          settings: 'settings'
      }),
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
      daysAfter({ date, value, statmentDays = 0 }) {
        if (!value.date) return
        const plan = moment(value.date).add(value.days, 'd')
        const res = daysDiff(date, plan) - statmentDays 
        return res < 0 ? 0 :  res
      },
      ocenca({ value }) {
        return toDouble(value.ocenca)
      },
      xProc({ value }) {
          const { procent, discount, days } = value
          return toDouble(toNumber(procent) / toNumber(days))
      },
      xStatment({ value }) {
          const { ocenca, discount, xProc, days } = value
          const res =  (toNumber(ocenca) + toNumber(discount)) * xProc * days / 100
          return toDouble(res)
      },
      xPen({ value }) {
        const { ocenca, discount, xPen } = value
        return toDouble((toNumber(ocenca) + toNumber(discount)) * xPen / 100)
      },
      minProcent({ value, xProc, daysBefore, settings }) {
        const minProcent = settings.minProcent || 0
        const procent = toNumber(value.procent) - (xProc * daysBefore)
        return procent < minProcent ? toDouble(minProcent) : 0
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
      number({ value }) {
        return value.number
      },
      model({ value, type, ocenca, procent, penalty, statment, total }) {
        const { _id: ref, number } = value
        return { ref, number, type, ocenca, procent, penalty, statment, total,
          values: [
            { dt: '301', ct: '377', summ: ocenca },
            { dt: '301', ct: '703', ...statment }, // ct 301 if return procent statment
            { dt: '703', ct: '301', ...procent }, // ct 301 if return procent
            { dt: '301', ct: '704', ...penalty }
          ].filter(v => toNumber(v.summ)) }
      }
    },
    methods: { moment, toNumber,
      t(v) {
        return this.$t(`vozvrat.${v}`)
      }
    } 
}
</script>

<style>
.bilet.disabled {
  background-color: #e9ecef;
}
</style>