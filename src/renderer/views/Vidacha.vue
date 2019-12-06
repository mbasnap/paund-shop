<template>
    <div class="row flex-fill vidacha">
        <div class="col-8 pt-3">
            <div class="row" style="height: 250px;">
                <klient class="col p-0" v-model="klient" :editable="!klient._id">
                    <span class="reset" v-show="!bilet._id"  @click="klient = {}">x</span>
                </klient>
                <div class="col pl-2 border-left">
                    <bilet class="row" style="height: 75%;" v-model="bilet"/> 
                    <div class="row">
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
            <obespechenie v-model="obespechenie" :editable="!bilet._id"/>
        </div>
        <kassa class="col-4"></kassa> 
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { summ, diff } from '@/functions'
import { Kassa, Klient, Bilet, Obespechenie } from '@/components'
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
    disabled() {
        const { klient, bilet, total } = this
        return !!bilet._id || [ klient, bilet ].some(v => !v.valid)
    }
},
methods: {
    ...mapActions({ saveKlient: "klient/save", saveBilet: "bilet/save", reestr: "reestr/save" }),
    async save() {
        const { klient, bilet, obespechenie, values } = this
        const { _id } = this.bilet = await this.saveBilet({ ...bilet, klient, obespechenie })
        return this.reestr({ ref: 'bilet', ref_id: _id, values })
    },
    clear() {
        this.klient = {}
        this.bilet = {}
        this.obespechenie = [ {} ]
    }
}
}
</script>

<style> </style>

