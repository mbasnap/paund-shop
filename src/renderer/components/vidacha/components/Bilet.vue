<template>

<div class="bilet">
    <div class="col-9">
        <named-select class="form-control mb-2" name="number" :value="{number}" :options="numbers"/>
        <input class='form-control mb-2' name="ssuda" :value="ssuda"
        @input="({ target }) => input(target)"
        @change="calculate({ssuda})"/>
        <div class=" input-group mb-2">
            <input class="form-control" :value="toDouble(toNumber(procent) - toNumber(discount))"/>
            <div class="input-group-append">
            <named-select class="form-control" name="xDisc" @change="calculate()"
            :value="{xDisc}" :options="discounts"/>
            </div>
        </div>   
        <input class='form-control mb-2' name="ocenca" :value="ocenca"
        @input="({ target }) => input(target)" @change="calculate({ocenca})"/> 
    </div>
    <day-slider class="col-3" :value="{days}" @change="calculate()" />
</div>

</template>

<script>

import { mapGetters } from 'vuex'
import mix from '@/widgets/named-input/mix.js'
import DaySlider from './DaySlider'
import { getOcenca, rorrect, toNumber, mult, toDouble, diff } from '@/functions'
export default {
mixins: [ mix ],
components: { DaySlider },
props: { value: Object, disabled: Boolean, type: String },
data() {
    return {
        from: 'ocenca'
    }
},
computed: {
    ...mapGetters({
        settings: 'settings',
        numbers: 'reestr/numbers'
    }),
    number({ value, numbers }) {
        return value.number || numbers[0]
    },   
    discounts({ settings }) {
        return settings.discounts || []
    },
    days({ value, settings }) {
        return value.days || settings.maxDays
    },
    xProc({ type, settings }) {
        return { ...settings.procent}[type ]
    },
    xPen({ type, settings }) {
        return { ...settings.penalty}[type]
    },
    xDisc({ value, discounts  }) {
        return value.xDisc || discounts[0]
    },
    ssuda({ value }) {
        const ssuda = value.ssuda
        return ssuda!== undefined ? ssuda : '0.00'
    },
    procent({ value }) {
        const procent = value.procent
        return toDouble(procent)
    },
    discount({ value }) {
        const discount = value.discount
        return toDouble(discount)
    },

    ocenca({ value }) {
        const ocenca = value.ocenca
        return ocenca !== undefined ? ocenca : '0.00'
    },
    model({ number, days, xProc, xPen, xDisc, ssuda, procent, discount, ocenca }) {
        return { number, days, xProc, xPen, xDisc, ssuda, procent, discount, ocenca }
    }
},
methods: { toDouble, toNumber,
    calculate(v = { [this.from]: this[this.from]}) {
        const [from, value] = Object.entries(v)[0]        
        this.from = from
        from === 'ssuda' ? this.fromSsuda(value) : this.fromOcenca(value)
    },
    fromSsuda(ssuda) {
        const { days, xProc, xDisc } = this
        const { ocenca, procent, discount } = this.getOcenca(ssuda, xProc * toNumber(days), xDisc)
        this.update({ ocenca, procent, discount, ssuda: toDouble(ssuda) })
    },
    fromOcenca(value) {
        const { days, xProc, xDisc } = this
        const { ocenca, procent, discount } = this.getOcenca(value, xProc * toNumber(days), xDisc)
        const rent = (procent - discount) / toNumber(ocenca)
        const ssuda = toNumber(ocenca) - procent + discount
        this.fromSsuda(ssuda - ssuda * rent)
    },
    getOcenca(value, xProc, xDisc) {        
        const getProcent = v => toNumber(v) * xProc / 100
        const isAfter = v => toNumber(v) - getProcent(v) >= toNumber(value)
        let ocenca = getOcenca(toNumber(value),  isAfter, xProc)
        ocenca = getOcenca(ocenca, isAfter, xProc * 0.1)
        ocenca = getOcenca(ocenca, isAfter, xProc * 0.01)
        ocenca = getOcenca(ocenca, isAfter, xProc * 0.001)
        let procent = toNumber(ocenca) - toNumber(value)
        // procent = procent > 10 ? procent : 10
        let discount = toNumber(procent) * xDisc / 100
        // discount = toNumber(procent) - discount > 10 ? discount : 0
        ocenca = toNumber(value) + toNumber(procent) - toNumber(discount)
        return { discount, procent, ocenca: toDouble(ocenca) }
    },
    readonly() {
        return this.disabled
    },
    input({ name, value }) {
        this.update({ [name]: value })
    },
    update(v) {
        this.$emit('input', { ...this.model, ...v })
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
