<template>
    <div class="row flex-fill vidacha">
        <div class="col-8 pt-3">
            <div class="row " style="height: 250px;">
                <klient ref="klient" class="col p-0" :value="klient" :disabled="disabled"/>
                <div class="col p-0 border-left">
                    <number class="col mb-2" v-model="bilet" :disabled="disabled" @select="update"/>
                    <bilet class="col mb-5" :value="model" :disabled="disabled"/>
                    <div class="col">
                        <div class="row">
                            <div class="col-6 ">
                                <button class="btn btn-primary" @click="update({})">reset</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-primary" :disabled="disabled"
                                @click="save().then(v => update())">save</button>
                            </div>   
                        </div>
                    </div>
                </div>                                 
            </div>        
            <obespechenie :value="obespechenie" :disabled="disabled"/>
        </div>
        <kassa ref="kassa" class="col-4"></kassa> 
    </div>
</template>

<script>

import { Number, Bilet } from './components'
import mix from '@/components/mix/vidacha-vozvrat'
import { toNumber, toDouble, summ, mult, diff, pDiff, moment } from '@/functions'
export default {
components: { Number, Bilet },
mixins: [ mix ],
computed: {
    days({ bilet }) {
        return moment(this.date).diff(bilet.date, 'd')
    },
    procent({ bilet }) {
        const { value, days: plan } = { ...bilet.procent }
        let days = this.days        
        days = days <= 0 ? 1 : days > plan ? plan : this.days
        return { ...bilet.procent, days, summ: toDouble(mult(value, days)) }
    },
    penalty({ bilet, procent }) {
        const { value } = { ...bilet.penalty}       
        const days = pDiff(this.days, procent.days)
        return { ...bilet.penalty, days, summ: toDouble(mult(value, days)) }
    },
    ssuda({ bilet, days }) {
        return { ...bilet.ssuda, days }
    },
    model({ bilet, days, ssuda, procent, penalty }) {
        return { days, ssuda, procent, penalty, ref: bilet._id }
    },
    type() {
        return 'dt'
    },
    values({ model, order, number: bilet }) {
        const { _id: klient, passport } = this.klient
        return [
            { dt: '301', ct: '377', ...model.ssuda },
            { dt: '301', ct: '703', ...model.procent },
            { dt: '301', ct: '704', ...model.penalty },
            { ct: '001', ...model, klient, passport },
            { ...order, title: `vozvtashena ssuda po zalogovomu biletu ${bilet}`}         
        ]
    },
    disabled({ bilet }) {
        return !{ ...bilet }._id
    }
},
methods: {}
}
</script>

<style>
.klient .btn.edit {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
</style>

