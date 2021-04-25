<template>
  <div :class="[ 'day-slider', 'p-0', { readonly: readonly } ]">
    <datepicker class="mb-2" v-model="dateModel" :editable="!readonly"
    format="dd.MM.yyyy" input_class="named-input day-slider-date"
    calendar_class="day-slider-left"/> 
    <vertical-slider :height="145" :offset="-15" v-model="model" :editable="!readonly"
    @change="v => $emit('change', v)"
    :min="days.min" :max="days.max"/>       
  </div>
</template>

<script>
import { moment } from '@/functions'
import { VerticalSlider, Datepicker } from "@/widgets"
import { mapGetters } from 'vuex'
const name = 'days'
export default {
components: { VerticalSlider, Datepicker },
props: { value: Object, name: String, readonly: Boolean },
computed: {
  ...mapGetters([ "date", "company" ]),
  days({ company }) {
    return {...company.days }
  },
  dateModel: {
    get({ date, value }) {
      return new Date(moment(date).add(value.days, 'd'))
    },
    set(v) {
      const value = moment(v).diff(this.date, 'd') + 1
      this.$emit('input', { name, value })
    }
  },
  model: {
    get({ value }) {
      return Number(value.days)
    },
    set(v) {
      this.$emit('input', { name, value: Number(v) })
    }
  }
}
}
</script>

<style >
  .day-slider {
    margin-left: -5px;
  }
  .day-slider input {
    cursor: pointer;
  }
  .day-slider-date {
    width: 75px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    font-size: 15px;
  }

</style>
