<template>
    <div class="row flex-fill vidacha">
        <div  class="col-8 pt-3">
            <div class="row" style="height: 250px;">
                <klient id="printMe" class="col p-0 " v-model="klient" :disabled="disabled">
                    <span class="reset" @click="klient = {}">x</span>
                </klient>
                <div class="col pl-2 border-left">
                    <bilet class="row" style="height: 75%;" v-model="model" :disabled="disabled"/> 
                    <div class="row">
                        <div class="col-3 ">
                            <button class="btn " @click="update()">reset</button>
                        </div>
                        <div class="col-3">
                            <button class="btn "
                            @click="save(values).then(id => update(dt001[id]))"> save</button>
                        </div>   
                        <div class="col-3">
                            <button class="btn btn-primary no-print"
                            @click="print"> print </button>
                        </div>   
                    </div>
                </div>                                 
            </div>        
            <obespechenie v-model="obespechenie" :disabled="disabled"/>
        </div>
        <kassa class="col-4"></kassa> 
    </div>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer
ipcRenderer.on('wrote-pdf', (evt, path) => {
    console.log(path);
    
})
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
computed: {
    ...mapGetters({
        klients: 'klient/klients',
        dt001: 'reestr/dt001',
        spec: 'settings'
        }),
    nextNumber({ dt001 }) {
        const numbers = Object.values(dt001).map(v => v.number)
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
    discount({ bilet, spec }) {
        return bilet.discount || spec.discounts[0]
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
    ssuda({ ocenca, days, procent }) {
        const summ = diff(ocenca, procent.summ)
        return { days, summ }
    },
    model: {
        get({ number, days, ocenca, discount, procent, penalty, ssuda }) {
            return { number, days, ocenca, discount, procent, penalty, ssuda }
        },
        set(v) {
            this.bilet = v
        }
    },
    values({ model, klient, obespechenie }) {
        return [
            { dt: '001', ...model, klient: klient._id, obespechenie },
            { dt: '377', ct: '301', title: 'vidana ssuda', ...model.ssuda },
            // { dt: '301', ct: '703', title: 'uplachen procent', ...procent }        
        ]
    },
    disabled({ bilet }) {
        return !!bilet._id
    }
},
methods: {
    ...mapActions({ save: "reestr/save" }),
    update(v = {}) {
        const { klient: id, obespechenie } = this.bilet = v
        this.klient = { ...this.klients[id] }
        this.obespechenie = obespechenie || [ {} ]
    },
    print() {
    window.print()
// modal.document.write(document.getElementById('printMe'))
// this.d.print( this.$el)
        // this.$htmlToPaper('printMe');
        // const content = "<h1> hello </h1>"
        // ipcRenderer.send("print-to-pdf", content)
    }
}
}
</script>

<style> 
@media print {
  .no-print {
    visibility: hidden;
  }
}
</style>

