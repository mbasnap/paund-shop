<template>
<div :class="['bilet', { disabled }]">
      <div class=" form-row mb-2" >
        <span class="col-3"> {{ t('ocenca') }} </span>
        <div class="value col">
            <span > {{ ocenca }} </span>
        </div>
      </div>
      <div v-show="daysBefore" class=" form-row mb-2" >
        <span class="col-3"> {{ t('procent') }} </span>
        <div class="value col">
            <span>{{ xProc }} x {{ daysBefore }} = </span>
            <span > {{ procent.summ }} </span>
        </div>
      </div>
      <div v-show="statmentDays" class=" form-row mb-2" >
        <span class="col-3"> {{ t('statment') }} </span>
        <div class="value col">
            <span>{{ statment.value }} x {{ statment.count }} = </span>
            <span > {{ statment.summ }} </span>
        </div>
      </div>
      <div v-show="daysAfter" class=" form-row mb-2" >
        <span class="col-3"> {{  t('penalty') }} </span>
        <div class="value col">
            <span>{{ xPen }} x {{ daysAfter }} = </span>
            <span > {{ penalty.summ }} </span>
        </div>
      </div>
      <div class=" form-row mb-2" >
        <span class="col-3"> {{ t('total') }} </span>
        <div class="value col">
            <span > {{ total }} </span>
        </div>
      </div>
    <div  v-if="value._id"  class="form-row m-0 mb-2" >
      <div v-if="statment && statment.date" class="col-4" >
        {{ moment(statment.date).format('L')}}
      </div>
      <div v-else class="col-1" >
        <input type="checkbox" class="form-check-input ml-0" id="dropdownCheck2"
        @change="addStatment(!statment.days)" :checked="!!statment.days">
      </div>
      <div class="col">
          <div v-if="!statment.days" style="text-align: left;">
            <label class="form-check-label" for="dropdownCheck2">{{t('add-statment')}}</label>
          </div>
          <div v-else>
            <div class="row m-0">
              <named-select class="form-control col" name="days" :disabled="!!statment.date"
              @change="({value}) => addStatment(true, value)"
              :value="{ days: statment.days }" :options="[10, 15, 20]"/>
              <svg-save v-if="!statment.date" class="col" width="20px" style="line-height: 30px;"
              @click="saveStatment(statment)"/>
              <svg-trash v-else class="col" width="20px" style="line-height: 30px;"
              @click="saveStatment(false)"/>
            </div>
          </div>
      </div>
    </div>
</div>
</template>

<script>
import mix from '@/widgets/named-input/mix.js'
import { SvgSave, SvgTrash } from '@/svg'
import { mapGetters, mapActions } from 'vuex'
import { proc, toNumber, toDouble, mult, diff, moment } from '@/functions'
export default {
    props: { value: Object, disabled: Boolean },
    mixins: [ mix ],
    components: { SvgSave, SvgTrash },
    computed: {
      ...mapGetters({
          date: 'date',
          order: 'reestr/nextOrder'
      }),
      days({ value, date }) {
          return this.daysDiff(date, value.date) || 1
      },
      daysBefore({ date, value }) {
        if (!value.date) return
        const plan = moment(value.date).add(value.days, 'd')
        const res = this.daysDiff(plan, date)
        // console.log('procent', res);
        return res < 0 ? 0 
          : res === value.days ? res - 1
            : res < value.days ? res : 0
      },
      statmentDays({ date: fact, value }) {
        const { date, days } = { ...value.statment}
        if(!date) return
        const res = this.daysDiff(fact, date)
        return res < 0 ? 0 
          : res <= days ? res : days
      },
      daysAfter({ date, value, statmentDays = 0 }) {
        if (!value.date) return
        const plan = moment(value.date).add(value.days, 'd')
        const res = this.daysDiff(date, plan) - statmentDays 
        // console.log('penalty', this.daysDiff(date, plan), statmentDays );
        return res < 0 ? 0 :  res
      },
      ocenca({ value }) {
        return toDouble(value.ocenca)
      },
      xProc({ value }) {
          const { procent, discount, days } = value
          return toDouble((procent - discount) / days)
      },
      xPen({ value }) {
          const { ocenca, xPen } = value
          return toDouble(toNumber(ocenca) * xPen / 100)
      },
      procent({ xProc: value, daysBefore: count }) {        
        return { value, count, summ: toDouble(value * count)}
      },
      penalty({ xPen: value, daysAfter: count }) {
        return { value, count, summ: toDouble(value * count)}
      },
      statment({ xProc: value, statmentDays: count }) {
        return { ...this.value.statment, count, value, summ: toDouble(value * count) }
      },
      total({ ocenca, procent, penalty, statment }) {
        const total = toNumber(ocenca) - toNumber(procent.summ)
        return toDouble(total + toNumber(statment.summ) + toNumber(penalty.summ))
      },
      model({ ocenca, procent, penalty, statment }) {
          return { ocenca, procent, penalty, statment }
      }
    },
    methods: { moment,
      ...mapActions({
        save: 'reestr/updateValue'
      }),
      addStatment(bool, days = 15 ) {
        const statment = bool ? { days } : false
        this.$emit('input', {...this.value, statment })
      },
      async saveStatment(v) {
        const statment = v ? {...v, date: this.date } : false
        this.$emit('input', await this.save({...this.value, statment}))
      },
      daysDiff(d1, d2) {
        if(!d1 || !d2) return
          d1 = moment(d1).startOf('day')
          d2 = moment(d2).startOf('day')
        return moment.duration(d1.diff(d2)).asDays()
      },
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