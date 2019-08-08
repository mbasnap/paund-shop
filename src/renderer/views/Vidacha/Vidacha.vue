<template>
    <div class="row flex-fill vidacha">
        <div class="col-8">
            <div class="row">
                <klient class="col-6 p-2" v-model="klient"/>
                <div class="col border-left pt-2">
                    <bilet v-model="bilet"/> 
                    <div class="row p-2">
                        <div class="col-6 ">
                            <button :class="btn" @click="reset">reset</button>
                        </div>
                        <div class="col-6">
                            <button  :class="saveBtn" @click="save">save</button>
                        </div>   
                    </div>
                </div>                                 
            </div>        
            <obespechenie v-model="obespechenie"/>
        </div>
        <kassa class="col-4"></kassa>       
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Kassa from '@/components/Kassa'
import Klient from '@/components/Klient.vue'
import Obespechenie from '@/components/Obespechenie.vue'
import Number from './Number.vue'
import Bilet from './Bilet.vue'
export default {
    components: {Kassa, Klient, Number, Bilet, Obespechenie},
    data () {
        return {
            // klient: {},
            bilet: {},
            obespechenie: {},
        }
    },
    computed: {
        ...mapGetters(['klient']),
        btn: () => 'btn btn-primary',
        saveBtn() {
            const {klient, bilet} = this
            const disabled = !bilet.valid ? 'disabled' : ''
            return this.btn + disabled
        },
        fullName() {
            const {name, family, sername} = this.klient
            return name + ' ' + family + ' ' + sername
        },
        number() {
            const {number} = this.bilet
            return 'po_zalogovomu_biletu ' + number
        },
        ssuda() {
            const {ocenka} = this.bilet
            return {
                summ: ocenka,
                text: 'vidana_ssuda ' + this.fullName + this.number
            }
        },
        procent() {
            const {procent} = this.bilet
            return {
                summ: procent,
                text: 'uplachen_procent ' + this.fullName + this.number
            }
        }
    },
methods: {
    ...mapActions(['vidanaSsuda', 'reset']),
    async save () {
        const {bilet, ssuda, procent} = this
        return this.vidanaSsuda ({bilet, ssuda, procent})
    }
}
}

</script>

<style>
input[readonly]{
  background-color:#fff !important;
}
</style>

