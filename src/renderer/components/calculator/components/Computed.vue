<template>
  <div class="computed">
        <named-input class='form-control mb-2' name="procent" :value="model"/> 
        <named-input class='form-control mb-2' name="penalty" :value="model"/>  
        <named-input class='form-control' name="statment" :value="model"/> 
  </div>
</template>

<script>
import { toDouble, summ } from '@/functions'
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    props: { value: Object },
    computed: {
        model({ value }) {
            return value
        }
    },
    methods: {
        readonly() {
            return true
        }
    }

}
</script>

<style>

</style>