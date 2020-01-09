<template>
    <div class="row flex-fill vidacha">
        <div  class="col-8 pt-3">
            <div class="row" style="height: 250px;">
                <klient class="col p-0 " v-model="klient" :disabled="disabled">
                    <span class="reset" @click="klient = {}">x</span>
                </klient>
                <div class="col pl-2 border-left">
                    <bilet class="row" style="height: 75%;" v-model="model" :disabled="disabled"/> 
                    <div class="row">
                        <div class="col-3 ">
                            <button class="btn btn-primary" @click="update({})">reset</button>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-primary"
                            @click="onSave(values)"> save</button>
                        </div>
                    </div>
                </div>                                 
            </div>        
            <obespechenie v-model="obespechenie" :disabled="disabled"/>
        </div>
        <kassa ref="kassa" class="col-4"/>
    </div>
</template>

<script>
import { toDouble, diff, pDiff, mult, proc } from '@/functions'
import { mapGetters, mapActions } from 'vuex'
import { Kassa, Klient, Bilet, Obespechenie } from './components'
export default {
components: { Kassa, Klient, Bilet, Obespechenie },
data () {
    return {
        klient: {},
        bilet: {},
        obespechenie: [ {} ],
    }
},
watch: {
    date() {
        this.update({})
    }
},
computed: {
    ...mapGetters({
        klients: 'klient/klients',
        dt001: 'reestr/dt001',
        dt002: 'reestr/dt002',
        spec: 'settings',
        discounts: 'discounts',
        date: 'date'
        }),
    nextNumber({ dt001 }) {
        const numbers = Object.values(dt001).map(v => v.number)
        return (Math.max(...numbers, 0) + 1)
    },
    nextOrder({ dt002 }) {
        const numbers = Object.values(dt002).map(v => v.number)
        return (Math.max(...numbers, 0) + 1)
    },
    number({ bilet, nextNumber }) {
        return bilet.number || nextNumber
    },   
    days({ bilet, spec }) {
        return bilet.days || spec.maxDays
    },    
    ocenca({ bilet }) {
        return toDouble(bilet.ocenca)
    },
    discount({ bilet, discounts }) {
        return bilet.discount || discounts[0]
    },
    procent({ ocenca, discount, days, spec }) {
        let procent = proc(ocenca, spec.procent)
        procent = toDouble(diff(procent, proc(procent, discount)))
        const summ = toDouble(mult(procent, days))
        return { procent, days, summ }
    },
    penalty({ ocenca, days, spec }) {
        let penalty = toDouble(proc(ocenca, spec.penalty))
        return { penalty, days }
    },
    title({ bilet }) {
        return `vidana ssuda po zalogovomu biletu ${bilet.number}`
    },
    ssuda({ ocenca, days, procent, title }) {
        const summ = diff(ocenca, procent.summ)
        return { days, summ, title }
    },
    kassa({ $refs }) {
        return $refs['kassa']
    },
    order({ title, nextOrder: number }) {
        return { title, number }
    },
    model: {
        get({ number, days, ocenca, discount, procent, penalty, ssuda }) {
            return { number, days, ocenca, discount, procent, penalty, ssuda }
        },
        set(v) {
            this.bilet = v
        }
    },
    values({ order, model, ssuda, obespechenie }) {
        const { _id: klient } = this.klient
        return [
            { dt: '001', ...model, klient, obespechenie },
            { dt: '002', ...order, to: klient },
            { dt: '377', ct: '301', ...ssuda },
        ]
    },
    disabled({ bilet }) {
        return !!bilet._id
    }
},
methods: {
    onSave(v) {
        return this.kassa.save(v)
            .then(([id]) => this.update(this.dt001[id]))
    },
    update(v) {
        const { klient: id, obespechenie } = this.bilet = v
        this.klient = { ...this.klients[id] }
        this.obespechenie = obespechenie || [ {} ]
    }
}
}
</script>

<style></style>

