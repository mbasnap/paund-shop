<template>
    <div class="row flex-fill vidacha">
        <div class="col-8 pt-3">
            <div class="row " style="height: 250px;">
                <klient class="col p-0" :value="klient" :editable="false"/>
                <div class="col p-0 border-left">
                    <calculator class="col" v-model="bilet" style="height: 75%;"/>
                    <div class="col">
                        <div class="row">
                            <div class="col-6 ">
                                <button class="'btn btn-primary'" @click="clear">reset</button>
                            </div>
                            <div class="col-6">
                                <button class="'btn btn-primary'" :disabled="!bilet._id"
                                @click="save">save</button>
                            </div>   
                        </div>
                    </div>
                </div>                                 
            </div>        
            <obespechenie :value="obespechenie" :editable="false"/>
        </div>
        <kassa class="col-4"></kassa> 
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { summ, diff } from '@/functions'
import { Kassa, Klient, Obespechenie, Calculator } from '@/components'
export default {
components: { Kassa, Klient, Obespechenie, Calculator },
data () {
    return {
        bilet: {}
    }
},
computed: {
    ...mapGetters({
        klients: 'klient/klients'
    }),
    klient({ bilet, klients }) {
        const { klient_id: id } = bilet
        return klients[id] || {}
    },
    obespechenie({ bilet }) {
        return bilet.obespechenie || []
    },
    values({ bilet }) {
        const { _id, number, ocenca, procent } = bilet
        return [
            { dt: '001',  number },
            { dt: '377', ct: '301', summ: ocenca },
            { dt: '301', ct: '703', summ: procent }  
        ]
    }
},
methods: {
    ...mapActions({ saveKlient: "klient/save", saveBilet: "bilet/save", reestr: "reestr/save" }),
    async save() {
        // const { klient, bilet, obespechenie, values } = this
        // const { _id } = this.bilet = await this.saveBilet({ ...bilet, klient, obespechenie })
        // return this.reestr({ ref: 'bilet', ref_id: _id, values })
    },
    clear() {
        this.bilet = {}
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

