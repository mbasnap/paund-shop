<template>
    <div class=" input-group " >
        <input  :value="procent" class="form-control mb-2" style="width: 70%" placeholder="0,00" readonly>
        <div class="input-group-append " style="width: 30%">
            <b-form-select class="form-control" :options="discounts"
            v-model="model"
            />
        </div>
    </div>    
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
// import {toDouble} from '@/functions'
export default {
data() {
    return {
        // toDouble
    }
},
props: {
    value: String,
    procent: String
},
computed: {
    ...mapGetters('bilet', ['discounts']),
    model: {
        get() {
            return this.value
        },
        set(v) {
            this.$emit('input', v)
        }
    }
},
methods: {
    // update(value) {
    //     return this.$emit('change', {name: 'discount', value})
    // }
}
}
</script>

<style>

</style>
