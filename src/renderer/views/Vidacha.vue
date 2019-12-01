<template>
    <div class="row flex-fill vidacha">
        <div class="col-8">
            <div class="row">
                <klient v-model="klient" class="klient col p-2" :editable="!klient._id">
                    <span v-show="!bilet._id" class="reset" @click="klient = {}">x</span>
                </klient>
                <div class="col border-left pt-2">
                    <bilet v-model="bilet" :total="total" :editable="!bilet._id"/> 
                    <div class="row p-2">
                        <div class="col-6 ">
                            <button class="'btn btn-primary'" @click="clear">reset</button>
                        </div>
                        <div class="col-6">
                            <button class="'btn btn-primary'" :disabled="disabled"
                            @click="save">save</button>
                        </div>   
                    </div>
                </div>                                 
            </div>        
            <obespechenie v-model="obespechenie" :editable="!bilet._id" :total="total"/>
        </div>
        <kassa class="col-4"></kassa> 
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { summ, diff } from '@/functions'
import Kassa from '@/components/Kassa'
import Klient from '@/components/Klient.vue'
import Obespechenie from '@/components/obespechenie'
import Bilet from '@/components/bilet'
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
    ...mapGetters(['klients']),
    values() {
        const { _id, number, ocenca, procent } = this.bilet
        return [
            { dt: '001',  number },
            { dt: '377', ct: '301', summ: ocenca },
            { dt: '301', ct: '703', summ: procent }  
        ]
    },
    total() {
        return this.obespechenie.reduce((cur, v) => {
            const ves = summ(cur.ves, v.ves)
            const derty = summ(cur.derty, v.derty)
            const ocenca = summ(cur.ocenca, v.ocenca)
            const valid = ocenca > 0
            return { ...cur, ves, derty, ocenca, valid }
        }, { ves: 0, derty: 0, ocenca: 0 })
    },
    disabled() {
        const { klient, bilet, total } = this
        return !!bilet._id || [ klient, bilet, total ].some(v => !v.valid)
    }
},
methods: {
    ...mapActions({ saveKlient: "klient/save", saveBilet: "bilet/save", reestr: "reestr/save" }),
    async save() {
        const { klient, bilet, obespechenie, values } = this
        const { _id: klient_id } = this.klient = await this.saveKlient(klient)
        const { _id: ref_id } = this.bilet = await this.saveBilet({ ...bilet, klient_id, obespechenie })
        return this.reestr({ ref: 'bilet', ref_id, values })
    },
    clear() {
        this.klient = {}
        this.bilet = {}
        this.obespechenie = [ {} ]
    }
}
}
</script>

<style>
/* input[readonly]{
  background-color:#fff !important;
} */
</style>

