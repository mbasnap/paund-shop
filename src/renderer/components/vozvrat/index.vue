<template>
    <div class="row flex-fill vidacha">
        <div class="col-8 pt-3">
            <div class="row " style="height: 250px;">
                <klient ref="klient" class="col p-0" :value="klient" :disabled="disabled"/>
                <div class="col p-0 border-left">
                    <number class="col mb-2" v-model="bilet" :disabled="disabled"
                    @select="update"/>
                    <bilet class="col mb-3" :value="model" :disabled="disabled"/>
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
import { proc, toNumber, toDouble, mult, diff, pDiff, moment } from '@/functions'
export default {
components: { Number, Bilet },
mixins: [ mix ],
computed: {
    days({ bilet }) {
        var given = moment(bilet.date).startOf('day');
        var current = moment(this.date).startOf('day');
        return moment.duration(current.diff(given)).asDays() || 1
    },
    procent({ bilet }) {
        const { value, days: plan } = { ...bilet.procent }
        let days = plan - this.days 
        days = days > 0 ? days : 0
        return { ...bilet.procent, days, summ: toDouble(value * days) }
    },
    penalty({ bilet }) {
        const { value, days: plan } = { ...bilet.penalty}       
        let days = this.days - plan
        days = days > 0 ? days : 0
        return { ...bilet.penalty, days, summ: toDouble(value * days) }
    },
    values({ bilet, model, number }) {
        const title = `vozvtashena ssuda po zalogovomu biletu ${number}`
        return {...model, title, ref: bilet._id, values: [
            { dt: '301', ct: '377', summ: model.ocenca },
            { dt: '703', ct: '301', ...model.procent }, // ct 301 if return procent
            { dt: '301', ct: '704', ...model.penalty }
        ].filter(v => toNumber(v.summ))}
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

