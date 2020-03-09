<template>
    <div class="statment-row">
        <div class="col-1" >
          <input type="checkbox" class="form-check-input ml-0" id="dropdownCheck2"
          :disabled="disabled"
          @change="addStatment({ value: 10 }, !statment.days)" :checked="!!statment.days">
        </div>
        <div v-if="!statment.days" class="col">
          <div class="row">
            <div  class="col">
              <label :class="['form-check-label', { disabled }]" for="dropdownCheck2" > 
                {{t('add-statment')}}
              </label>
            </div>
          </div>
        </div>
        <div v-else class="col" style="font-size: 14px;">
          <div class="row m-0" >
            <named-select class="col-4 form-control" name="days"
            style="font-size: 14px; padding: 0; height: 25px;"
            @change="v => addStatment(v, true)" :value="{ days: statment.days }"
            :options="[10, 15, 20]"/>
            <div class="col pr-0" style="text-align: right;">
              {{ moment(statment.date).format('L')}}
            </div>
          </div>
        </div>
        <div class="col-4" style="text-align: right;">
          <slot></slot>
        </div>
    </div>
</template>

<script>
import mix from '@/widgets/named-input/mix.js'
import { mapGetters, mapActions } from 'vuex'
import { proc, daysDiff, toNumber, toDouble, mult, diff, moment } from '@/functions'
export default {
    mixins: [ mix ],
    props: { value: Object },
    computed: {
        ...mapGetters({
            date: 'date',
        }),
        statment({ value }) {
            return { ...value.statment }
        },
        disabled({ value, statment, date }) {
          const days = daysDiff(date, value.date) || 1
          return !statment.days && toNumber(value.days) > toNumber(days)
        }
    },
    methods: { moment,
      ...mapActions({
        save: 'reestr/save'
      }),
      async addStatment({ value: days }, bool) {
        let statment = bool ? { days, date: this.date } : false
        this.$emit('input', await this.save({...this.value, statment}))
      },
      t(v) {
        return this.$t(`vozvrat.${v}`)
      }
    }

}
</script>

<style>
.statment-row .disabled {
    color: rgba(29, 33, 36, 0.52);
}
/* .bilet .statment {
    font-size: 14px;
    height: 25px;
    padding: 0;
} */
</style>