<template>
    <div class="row flex-fill vidacha">
        <div  class="col-8 pt-3">
            <div class="row" style="height: 250px;">
                <klient ref="klient" class="col p-0 " v-model="klient" :disabled="disabled">
                    <span class="reset" @click="klient = {}">x</span>
                </klient>
                <div class="col pl-2 border-left">
                    <bilet class="row" style="height: 75%;" :value="model" :disabled="disabled"
                    @input="v => bilet = v"/> 
                    <div class="row">
                        <div class="col-3 ">
                            <button class="btn btn-primary" @click="update()">reset</button>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-primary"
                            @click="save()"> save</button>
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
import { Bilet } from './components'
import mix from '@/components/mix/vidacha-vozvrat'
import { proc, summ, toNumber, toDouble, mult, diff, pDiff, moment } from '@/functions'
export default {
components: { Bilet },
mixins: [ mix ],
computed: {
    ocenca({ bilet, obespechenie }) {
        const ocenca = toNumber(bilet.ocenca)
            || summ(...obespechenie.map(v => v.ocenca))
        return toDouble(ocenca)
    },
    procent({ ocenca, days, xProc: procent, discount }) {
        let value = proc(ocenca, procent)
        value = diff(value, proc(value, discount))
        return { procent, discount, value, days, summ: toDouble(mult(value, days)) }
    },
    penalty({ ocenca, xPen: penalty }) {
        return { penalty, value: toDouble(proc(ocenca, penalty)) }
    },
    ssuda({ ocenca, days, procent }) {
        return { days, summ: toDouble(diff(ocenca, procent.summ)) }
    },
    model({ number, ocenca, days, ssuda, procent, discount, penalty }) {
        return { number, ocenca, days, ssuda, procent, discount, penalty }
    },
    values({ model, order, number: bilet, nextOrder }) {
        const { _id: klient, passport } = this.klient
        const title = `vidana ssuda po zalogovomu biletu ${bilet}`
        const obespechenie = (this.obespechenie || []).filter(v => toNumber(v.ocenca))
        return [
            { dt: '377', ct: '301', ...model.ssuda },
            { dt: '001', ...model, obespechenie, klient, passport },
            { ct: '002', ...order, title, bilet, number: nextOrder['ct'] }         
        ]
    },
    disabled({ bilet }) {
        return !!{ ...bilet }._id
    }
},
methods: { }
}
</script>

<style></style>

