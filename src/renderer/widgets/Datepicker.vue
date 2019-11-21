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

</style>
