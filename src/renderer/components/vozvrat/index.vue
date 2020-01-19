<template>
    <div class="row flex-fill vidacha">
        <div class="col-8 pt-3">
            <div class="row " style="height: 250px;">
                <klient class="col p-0" :value="klient" :disabled="disabled"/>
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
                                @click="kassa.save(values)">save</button>
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
import { mapGetters, mapActions } from 'vuex'
import { toNumber, toDouble, summ, mult, diff, pDiff, moment } from '@/functions'
import { Klient, Number, Bilet, Obespechenie, Kassa } from './components'
export default {
components: { Klient, Number, Bilet, Obespechenie, Kassa },
data () {
    return {
        bilet: {}
    }
},
watch: {
    date() {
        this.update({})
    }
},
computed: {
    ...mapGetters({ 
        klients: 'klient/map',
        date: 'date',
        empty: 'reestr/empty',
        lastOrder: 'reestr/lastOrder'
    }),
    klient({ bilet,  klients }) {
        const { klient } = bilet
        return { ...klients[klient] }
    },
    obespechenie({ bilet, dt001 }) {
        const { obespechenie } = bilet
        return obespechenie || []
    },

    days({ bilet }) {
        return moment(this.date).diff(bilet.date, 'd') || 1
    },
    ssuda({ bilet, days }) {
        return { ...bilet.ssuda, days }
    },
    procent({ bilet }) {
        let { procent, days, summ } = bilet.procent || {}
        days = pDiff(this.days, days) ? days : this.days
        summ = toDouble(mult(days, procent))
        return { ...bilet.procent, days, summ }
    },
    penalty({ bilet }) {
        let { penalty, days, summ } = bilet.penalty || {}
        days = pDiff(this.days, days)
        summ = toDouble(mult(days, penalty))
        return { ...bilet.penalty, days, summ }
    },
    order({ bilet, klient, lastOrder }) {
        const number = lastOrder.dt + 1
        const title = `vozvrashena ssuda po zalogovomu biletu ${bilet.number}`
        const from = `${klient.family} ${klient.name} ${klient.sername}`
        return { title, number, from }
    },
    model({ ssuda, procent, penalty }) {
        return { ssuda, procent, penalty }
    },
    values({ order, ssuda, procent, penalty }) {
        const { _id: klient, passport } = this.klient
        const { _id: ref, number } = this.bilet
        return { ref, number, klient, passport, order, values: [
            { dt: '301', ct: '377', ...ssuda },
            { dt: '301', ct: '703', ...procent },
            { dt: '301', ct: '704', ...penalty }              
        ]}
    },
    disabled({ bilet, empty }) {
        return !empty[bilet._id]
    },
    kassa({ $refs }) {
        return $refs['kassa']
    },
},
methods: {
    update(v) {
        this.bilet = { ...v }
    }
}
}
</script>

<style>
.klient .btn.edit {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
</style>

