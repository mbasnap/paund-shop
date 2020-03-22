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

        <div class="input-group mb-2">
            <input class='form-control' name="ssuda" :disabled="disabled"
            :value="ssuda" @input="({ target }) => input(target)"
            @change="calculate({ssuda})"/>
            <input v-if="editMode"
            class="input-group-append form-control col-5"
            style="color: green; font-weight: bold; margin-left: 1px;" 
            @change="({target}) => this.$emit('change', { name: 'pay', value: toNumber(target.value) })"
            :value="toNumber(value.pay) > 0 ? value.pay : '0.00 '"/>
        </div>

        <div class=" input-group mb-2">
            <input class="form-control" :value="procent" :disabled="disabled"/>
            <named-select class="input-group-append form-control col-4" name="xDisc"
             :value="{ xDisc }" :options="discounts"
             @change="$nextTick(() => calculate())"/>
        </div>

        <div class="input-group mb-2">
            <input :class="['form-control col', { 'is-invalid': err.ocenca_over }]"
            name="ocenca" :disabled="disabled"
            :value="ocenca" @input="({ target }) => input(target)"
            @change="calculate({ocenca})"/>
            <input v-if="editMode" class="input-group-append form-control col-5 mr-1"
            style="color: red; font-weight: bold; margin-left: 1px;" 
            @change="({target}) => this.$emit('change', { name: 'pay', value: toNumber(target.value) * -1 })"
            :value="toNumber(value.pay) < 0 ? value.pay : '0.00 '"/>
        </div>

    </div>
    <day-slider class="col-3" :value="{ days }"
    @input="input" @change="$nextTick(() => calculate())"/>
</div>

</template>

<script>

import { mapGetters } from 'vuex'
import mix from '@/widgets/named-input/mix.js'
import DaySlider from './DaySlider'
import { SvgExclamation } from '@/svg'
import { getOcenca, rorrect, toNumber, mult, toDouble, diff } from '@/functions'
export default {
mixins: [ mix ],
components: { DaySlider, SvgExclamation },
props: {
    value: Object,
    err: Object,
    disabled: Boolean,
    editMode: Boolean
},
data() {
    return {
        from: 'ocenca'
    }
},
computed: { 
    ...mapGetters({
        company: 'company',
        numbers: 'reestr/numbers'
    }),
    type({ value }) {
        const { obespechenie } = value
        return obespechenie.some(({ proba }) => proba) ? 'gold' : 'things'
    },
    number({ value, numbers }) {
        return value.number || numbers[0]
    },   
    discounts({ company }) {
       return (company.discount || '').split(',')
        .filter(v => !!v).map(v => v.trim())
    },
    days({ value, company }) {
        const { max } = {...company.days }
        return value.days || max
    },
    xProc({ type, company }) {
        const procent = {...company.procent}
        return procent[type ]
    },
    xPen({ type, company }) {
        const penalty = {...company.penalty}
        return penalty[type ]
    },
    xDisc({ value, discounts  }) {
        return value.xDisc || discounts[0]
    },
    ssuda({ value, from }) {
        const ssuda =  value.ssuda !== undefined ? value.ssuda : '0.00'
        return from ==='ssuda' ? ssuda 
            : toDouble(toNumber(this.ocenca) - toNumber(this.procent))
    },
    minProcent({ value,  company }) {
        const { min } = {...company.procent}
        return value.procent < min ? min : 0
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
        return { number, zalog: type, days, xProc, xPen, xDisc, ssuda, procent, discount, ocenca, 
        values: [
            { dt: '377', ct: '301', summ: ocenca },
            { dt: '301', ct: '703', summ: procent }
        ].filter(v => toNumber(v.summ)) }
    }
},
methods: { toDouble, toNumber,
    positive(v) {
        return toNumber(v) >= 0
    },
    calculate(v = { [this.from]: this[this.from]}) {
        const [from, value] = Object.entries(v)[0]
        this.from = from
        return from === 'ssuda' ? this.fromSsuda(value) : this.fromOcenca(value)
    },
    fromSsuda(ssuda) {
        const { days, xProc } = this
        const ocenca = this.getOcenca(ssuda, xProc * toNumber(days))
        const procent = ocenca - toNumber(ssuda)
        return this.update({ procent, ssuda: toDouble(ssuda) })
    },
    fromOcenca(ocenca) {
        const { days, xProc } = this
        const procent = toNumber(ocenca) * xProc / 100 * days
        return this.update({ ocenca: toDouble(ocenca), procent })
    },
    getOcenca(value, xProc = 0) {    
        const getProcent = v => toNumber(v) * xProc / 100
        const isAfter = v => toNumber(v) - getProcent(v) >= toNumber(value)
        let ocenca = getOcenca(toNumber(value),  isAfter, xProc)
        ocenca = getOcenca(ocenca, isAfter, xProc * 0.1)
        ocenca = getOcenca(ocenca, isAfter, xProc * 0.01)
        return getOcenca(ocenca, isAfter, xProc * 0.001)
    },
    input({ name, value }) {
        if (['ssuda', 'ocenca'].includes(name)) this.from = name
        this.update({ [name]: value })
    },
    update(v) {
        const value = { ...this.value, ...v }
        this.$emit('input', value)
        return value
    },

}
}
</script>

<style>

.bilet .form-control:focus  {
border-color: rgba(56, 61, 65, 0.22);
box-shadow: none;
}
.bilet input[disabled] {
    background-color: initial;
}


</style>
