<template>

<div class="bilet">
    <div class="col-9">
        <div class="row">
            <div class="col-5" style="line-height: 40px; text-align: right;">Билет № </div>
            <div class="col">
                <named-select class="form-control mb-2" name="number"
                :value="{ number }" :options="numbers"/>
            </div>
        </div>
        <input class='form-control mb-2' name="ssuda" :value="ssuda"
        @input="({ target }) => input(target)"
        @change="calculate({ssuda})"/>
        <div class=" input-group mb-2">
            <input class="form-control" :value="procent"/>
            <div class="input-group-append">
            <named-select class="form-control" name="xDisc"
             @change="calculate()" :value="{xDisc}" :options="discounts"/>
            </div>
        </div>   
        <input class='form-control mb-2' name="ocenca" :value="ocenca"
        @input="({ target }) => input(target)" @change="calculate({ocenca})"/> 
    </div>
    <day-slider class="col-3" :value="{ days }"
    @input="input" @change="$nextTick(() => calculate({ocenca}))"/>
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
props: {
    value: { type: Object,
        default() {
            return {}
        }
    },
    disabled: Boolean,
    type: String
},
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
    ssuda({ value, from }) {
        const ssuda =  value.ssuda !== undefined ? value.ssuda : '0.00'
        return from ==='ssuda' ? ssuda 
            : toDouble(toNumber(this.ocenca) - toNumber(this.procent))
    },
    minProcent({ value,  settings }) {
        const minProcent = settings.minProcent || 0
        return value.procent < minProcent ? minProcent : 0
    },
    procent({ value, discount, minProcent, from }) {
        const procent = toNumber(this[from]) ? minProcent || value.procent - discount : 0
        return toDouble(procent)
    },
    discount({ value, xDisc, minProcent }) {
        const discount = !minProcent ? value.procent * xDisc / 100 : 0
        return toDouble(discount)
    },
    ocenca({ value, from }) {    
        const ocenca =  value.ocenca !== undefined ? value.ocenca : '0.00'
        return from ==='ocenca' ? ocenca
            : toDouble(toNumber(this.ssuda) + toNumber(this.procent))
    },
    model({ number, type, days, xProc, xPen, xDisc, ssuda, procent, discount, ocenca }) {
        return { number, type, days, xProc, xPen, xDisc, ssuda, procent, discount, ocenca, 
        values: [
            { dt: '377', ct: '301', summ: ocenca },
            { dt: '301', ct: '703', summ: procent }
        ].filter(v => toNumber(v.summ)) }
    }
},
methods: { toDouble, toNumber,
    calculate(v = { [this.from]: this[this.from]}) {
        const [from, value] = Object.entries(v)[0]        
        this.from = from
        from === 'ssuda' ? this.fromSsuda(value) : this.fromOcenca(value)
    },
    fromSsuda(ssuda) {
        const { days, xProc } = this
        const ocenca = this.getOcenca(ssuda, xProc * toNumber(days))
        const procent = ocenca - toNumber(ssuda)
        this.update({ procent, ssuda: toDouble(ssuda) })
    },
    fromOcenca(ocenca) {
        const { days, xProc } = this
        const procent = toNumber(ocenca) * xProc / 100 * days
        this.update({ ocenca: toDouble(ocenca), procent })
    },
    getOcenca(value, xProc = 0, xDisc = 0) {    
        const getProcent = v => toNumber(v) * xProc / 100
        const isAfter = v => toNumber(v) - getProcent(v) >= toNumber(value)
        let ocenca = getOcenca(toNumber(value),  isAfter, xProc)
        ocenca = getOcenca(ocenca, isAfter, xProc * 0.1)
        ocenca = getOcenca(ocenca, isAfter, xProc * 0.01)
        return getOcenca(ocenca, isAfter, xProc * 0.001)
    },
    readonly() {
        return this.disabled
    },
    input({ name, value }) {
        if (['ssuda', 'ocenca'].includes(name)) this.from = name
        // console.log(name, value);
        
        this.update({ [name]: value })
    },
    update(v) {
        this.$emit('input', { ...this.value, ...v })
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
