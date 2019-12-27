<template>
<div class="bilet">
    <div class="col-9">
        <named-input class='form-control mb-2' name="number" :value="value"/>
        <input class='form-control mb-2' :value="ssuda.summ" readonly/>
        <div class=" input-group mb-2">
            <input class="form-control" :value="procent.summ" readonly/>
            <div class="input-group-append">
            <named-select class="form-control" name="discount" :value="value" :options="spec.discounts"/>
            </div>
        </div>
        <named-input class='form-control' name="ocenca" :value="value"/>  
    </div>
    <day-slider class="col-3" :value="value"/>
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import mix from '@/widgets/named-input/mix.js'
import DaySlider from './DaySlider'
export default {
mixins: [ mix ],
components: { DaySlider },
props: { value: Object, disabled: Boolean },
computed: {
    ...mapGetters({
        spec: 'settings'
    }),
    ocenca({ value }) {
        return value.ocenca
    },
    procent({ value }) {
        return value.procent
    },
    ssuda({ value }) {
        return value.ssuda
    }
},
methods: {
    readonly() {
        return this.disabled
    },
    change({ name, value }) {
        this.$emit('input', { ...this.value, [name]: value })
    }
}
}
</script>

<style>

.bilet .form-control:focus  {
border-color: rgba(56, 61, 65, 0.22);
box-shadow: none;
}

</style>
