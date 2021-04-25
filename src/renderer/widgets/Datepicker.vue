<template>
  <div class="datepicker">
    <datepicker :calendar-class="calendar_class" v-model="model"
    :format="format"
    :language="lang"
    :input-class="input_class"
    @change="({target}) => $emit('change', target)"
    /> 
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ru } from 'vuejs-datepicker/dist/locale'
export default {
  components: { Datepicker},
  props: {
    value: Date,
    position: String,
    format: String,
    input_class: String,
    calendar_class: String,
    editable: Boolean
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    },
    lang() {
      return ru
    }
  }
}
</script>

<style>
  .day-slider-center {
    width: 250px;
    font-size: 12px;
  }
  .day-slider-left {
    margin-left: -150px;
    width: 250px;
    font-size: 12px;
  }
</style>
