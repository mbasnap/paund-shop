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
            <input class='form-control' name="ssuda" :disabled="disabled" :value="ssuda"
            @input="({ target }) => input(target)"
            @change="input({name: 'ssuda', value: toDouble(ssuda)})"/>
            <input v-if="editMode"
            class="input-group-append form-control col-5"
            style="color: green; font-weight: bold; margin-left: 1px;" 
            @change="({target}) => this.$emit('change', { name: 'pay', value: toNumber(target.value) })"
            :value="toNumber(value.pay) > 0 ? value.pay : '0.00 '"/>
        </div>

        <div class=" input-group mb-2">
            <input class="form-control" :value="procent" :disabled="disabled"/>
            <named-select class="input-group-append form-control col-4" name="xDisc"
             :value="{ xDisc }" :options="discounts"/>
        </div>

        <div class="input-group mb-2">
            <input :class="['form-control col', { 'is-invalid': err.ocenca_over }]"
            :disabled="disabled" :value="ocenca"
            @change="({ target }) => calculate(target.value)"/>
            <input v-if="editMode" class="input-group-append form-control col-5 mr-1"
            style="color: red; font-weight: bold; margin-left: 1px;" 
            @change="({target}) => this.$emit('change', { name: 'pay', value: toNumber(target.value) * -1 })"
            :value="toNumber(value.pay) < 0 ? value.pay : '0.00 '"/>
        </div>

    </div>
    <day-slider class="col-3" :value="{ days }" @input="input" />
</div>

</template>

<script>

import { mapGetters } from 'vuex'
import mix from '@/widgets/named-input/mix.js'
import DaySlider from './DaySlider'
import { SvgExclamation } from '@/svg'
import { toNumber, proc, toDouble, summ } from '@/functions'
export default {
mixins: [ mix ],
components: { DaySlider, SvgExclamation },
props: {
    value: Object,
    err: Object,
    disabled: Boolean,
    editMode: Boolean
},

computed: { 
    ...mapGetters({ company: 'company', numbers: 'reestr/numbers' }),
    type({ value }) {
        return (value.obespechenie || []).some(({ proba }) => proba) ? 'gold' : 'things'
    },
    number({ value, numbers }) {
        return value.number || numbers[0]
    },   
    discounts({ company }) {
       return (company.discount || '').split(',')
        .filter(v => !!v).map(v => v.trim())
    },
    days({ value, company }) {
        return value.days || {...company.days }.max
    },
    xProc({ type, company }) {
        return {...company.procent}[type ]
    },
    xPen({ type, company }) {
        return {...company.penalty}[type ]
    },
    xDisc({ value, discounts  }) {
        return toNumber(value.xDisc || discounts[0])
    },
    ssuda({ value }) {
        return value.ssuda  || value.ssuda === '' ? value.ssuda : '0.00'
    },
    minProcent({ value,  company }) {
        return {...company.procent}.min
    },
    procent({ ssuda, ocenca}) {
        return toDouble(toNumber(ocenca) - toNumber(ssuda))
    },
    ocenca({ ssuda, minProcent }) {
        const k = (100 - this.getProcent(100)) / 100
        const ocenca = toNumber(ssuda) / k
         return ocenca && (ocenca - ssuda) < minProcent ? summ(ssuda, minProcent)
            : toDouble(ocenca)
    },
    model({ number, type, days, xProc, xPen, ssuda, procent, ocenca }) {
        const xDisc = toNumber(procent) > this.minProcent ? this.xDisc : 0
        const discount = xDisc ? toDouble(proc(proc(ocenca, xProc), xDisc) * days) : '0.00'
        return { number, zalog: type, days, xProc, xPen, xDisc, ssuda, procent, discount, ocenca, 
        values: [
            { dt: '377', ct: '301', summ: ocenca },
            { dt: '301', ct: '703', summ: procent }
        ].filter(v => toNumber(v.summ)) }
    }
},
methods: { toDouble, toNumber,
    getProcent(value) {
        const procent = proc(value, this.xProc) * this.days
        return procent - proc(procent, this.xDisc)
    },
    calculate(ocenca) {
        const procent = this.getProcent(ocenca)
        const value = summ(ocenca, procent * -1)
        this.input({ name: 'ssuda', value })
    },
    input({ name, value }) {
        this.$emit('input', {...this.value, [name]: value})
    }

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
