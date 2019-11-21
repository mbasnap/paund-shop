<template>
    <input :value="double ? toDouble(value) : value" name="ocenka" class='form-control' placeholder="0,00"
    @change="double = true"
    @input="({target}) => {
        double = false
        $emit('input', target.value)
    }"
    />   
</template>

<script>
import { toDouble } from '@/functions'
export default {
props: {
    value: String
},
data() {
    return {
        toDouble,
        double: false
    }
},
computed: {},
methods: {}
}
</script>

<style>

</style>
