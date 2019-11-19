<template>
    <div class="row bilet">
        <div class="col-9">
            <b-form-select  class='form-control mb-2'  v-model="number" :options="emptyNumbers"/>
            <input  :value="toDouble(ssuda)" class='form-control mb-2' placeholder="0,00" readonly/>
            <procent :procent="toDouble(procent)" v-model="discount" />
            <ocenka v-model="ocenka" />  
        </div>
        <day-slider class="col-3" :min="minDays" :max="maxDays" v-model="days" />
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import DaySlider from './DaySlider'
import Ocenka from './Ocenka'
import Procent from './Procent'
import { toDouble } from '@/functions'
export default {
components: {Ocenka, Procent, DaySlider},
props: {
    value: Object
},
watch: {
    value(v) {
        this.bilet = v
    }
},
data () {
    return {
        toDouble,
        bilet: {}
    }
},
computed: {
    ...mapGetters('bilet', ['discounts', 'emptyNumbers', 'maxDays', 'minDays']),
    ssuda() {
        const {ocenka, procent} = this
        return ocenka - procent
    },
    procent() {
        const {ocenka, days, discount} = this
        const procent = (ocenka * 0.7 / 100) * days
        return procent - procent * discount / 100
    },
    number: {
        get() {return this.bilet.number || this.emptyNumbers[0]},
        set(value) {this.update({name: 'number', value})}
    },
    ocenka: {
        get() {return this.bilet.ocenka},
        set(value) {this.update({name: 'ocenka', value})}
    },
    discount: {
        get() {return this.bilet.discount || this.discounts[0]},
        set(value) {this.update({name: 'discount', value})}
    },
    days: {
        get() {return this.bilet.days || this.maxDays},
        set(value) {this.update({name: 'days', value})}
    },
    valid() {
        return this.ocenka > 0
    }
},
methods: {
    update({ name, value }) {
        this.bilet= { ...this.bilet, [name]: value }
        const { number, days, discount, ocenka, procent, ssuda, valid } = this
        this.$emit('input', {number, days, discount, ocenka, procent, ssuda, valid})
    }
}
}
</script>

<style>
.bilet .day-slider {
    margin-top: auto;
}
.bilet .form-control:focus  {
border-color: rgba(56, 61, 65, 0.22);
box-shadow: none;
}

</style>
