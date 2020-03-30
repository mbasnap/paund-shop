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
            @change="({target}) => calculate(target.value)"/>
            <input v-if="editMode" class="input-group-append form-control col-5"
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
            :disabled="disabled" :value="ocenca" name="ocenca" @input="({ target }) => input(target)"
            @change="input({name: 'ocenca', value: toDouble(ocenca)})"
            />
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
data() {
    return {
        from: 'ocenca'
    }
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
    minProcent({ value,  company }) {
        return toNumber(value.ocenca) ? {...company.procent}.min : 0
    },
    ssuda({ ocenca, procent }) {
        const ssuda = toNumber(ocenca) - toNumber(procent)
        return toDouble(ssuda > 0 ? ssuda : 0)
    },
    procent({ minProcent, ocenca}) {
        const procent = this.getProcent(ocenca)
        return toDouble(procent > minProcent ? procent : minProcent)
    },
    ocenca({ value }) {
        return value.ocenca || value.ocenca === '' ? value.ocenca : '0.00'
    },
    model({ number, type, days, xProc, xPen, ssuda, procent, ocenca }) {
        const xDisc = toNumber(procent) > this.minProcent ? this.xDisc : 0
        const fullProcent = toDouble(proc(ocenca, xProc) * days)
        const discount = xDisc ? toDouble(proc(fullProcent, xDisc)) : '0.00'
        return { number, zalog: type, days, xProc, xPen, xDisc, ssuda, procent, fullProcent, discount, ocenca, 
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
    calculate(v) { 
        this.from = 'ssuda'    
        const k = (100 - this.getProcent(100)) / 100
        let ocenca = toNumber(v) / k
        ocenca = (ocenca - toNumber(v)) > this.minProcent ? toDouble(ocenca)
            : summ(v, this.minProcent)
        this.$emit('input', {...this.value, ocenca })
    },
    input({ name, value }) {
        const ssuda = this.ssuda
        if(name === 'ocenca') this.from = 'ocenca'
        this.$emit('input', {...this.value, [name]: value })
        if (this.from === 'ssuda') this.$nextTick(() => {
            this.calculate(ssuda)
        })
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
