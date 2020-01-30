<template>

<div class="bilet">
    <div class="col-9">
        <named-select class="form-control mb-2" name="number" :value="value" :options="numbers"/>
        <input class='form-control mb-2' :value="total" @change="v => doFunction(v.target)"/>
        <div class=" input-group mb-2">
            <input class="form-control" :value="procent.summ" readonly/>
            <div class="input-group-append">
            <named-select class="form-control" name="discount" :value="value" :options="discounts"/>
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
import { getProcent, getOcenca, rorrect, round, toNumber, mult, toDouble, diff } from '@/functions'
export default {
mixins: [ mix ],
components: { DaySlider },
props: { value: Object, disabled: Boolean },
computed: {
    ...mapGetters({
        settings: 'settings',
        numbers: 'reestr/numbers'
    }),
    discounts({ settings }) {
        return settings.discounts || []
    },
    procent({ value }) {
        return { ...value.procent }
    },
    ocenca({ value }) {
        return value.ocenca
    },
    total({ ocenca, procent }) {
        const total = diff(ocenca, procent.summ)
        return toDouble(total)
    }
},
methods: {

    doFunction({ value }) {
        const isAfter = ocenca => {
            const procent = getProcent({ ...this.procent, ocenca })
            return ocenca - procent >= value
        }
        let ocenca = getOcenca({ ...this.procent, ocenca: toNumber(value) }, isAfter)
        ocenca = getOcenca({ ...this.procent, ocenca}, isAfter, 0.1)
        ocenca = getOcenca({ ...this.procent, ocenca}, isAfter, 0.01)
        ocenca = getOcenca({ ...this.procent, ocenca}, isAfter, 0.001)
        ocenca = getOcenca({ ...this.procent, ocenca}, isAfter, 0.0001)
        ocenca = rorrect({ ...this.procent, ocenca})
        this.change({ value: ocenca, name: 'ocenca' })
    },
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
