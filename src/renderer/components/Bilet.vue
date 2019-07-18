<template>
    <instant  v-model="model" name="number" ></instant>
</template>

<script>
import { mapGetters } from 'vuex'
import {Instant} from "@/widgets"
export default {
    props: ['value'],
    components: {  Instant},
    computed: {
      // ...mapGetters('bilet', ['nextNumber']),
      model: {
          get() {
            return  {}
          },
          set(v) {
            this.$emit('input', v)
          }
      }
    } 

}
</script>

<style>

</style>
