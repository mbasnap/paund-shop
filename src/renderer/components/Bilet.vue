<template>
    <instant  v-model="model" name="number" ></instant>
</template>

<script>
import { mapGetters } from 'vuex'
import {Instant} from "@/widgets"
export default {
    props: ['value'],
    components: {  Instant},
    created() {
        this.update()
    },
    computed: {
      ...mapGetters('bilet', ['nextNumber', 'update']),
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
