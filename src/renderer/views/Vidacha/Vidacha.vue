<template>
    <div class="row flex-fill vidacha">
        <div class="col-8">
            <div class="row">
                <klient class="col-6 p-2"/>
                <div class="col border-left pt-2">
                    <bilet v-model="bilet"/> 
                    <div class="row p-2">
                        <div class="col-6 ">
                            <button class="'btn btn-primary'" @click="clear">reset</button>
                        </div>
                        <div class="col-6">
                            <button class="'btn btn-primary'" :disabled="disabled"
                            @click="save().then(clear)"
                            >save</button>
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
components: { Kassa, Klient, Number, Bilet, Obespechenie },
data () {
    return {
        bilet: {},
        obespechenie: [],
    }
},
computed: {
    ...mapGetters(['klient']),
    disabled() {
        const klient = Object.keys(this.klient).length
        const bilet = Object.keys(this.bilet).length
        return !klient || !bilet
    },
    fullName() {
        const { name, family, sername } = this.klient
        return name + ' ' + family + ' ' + sername
    }, 
    number() {
        return 'po_zalogovomu_biletu ' + this.bilet.number
    },
    ssuda() {
        return {
            summ: this.bilet.ocenka,
            text: 'vidana_ssuda ' + this.fullName + this.number
        }
    },
    procent() {
        return {
            summ: this.bilet.procent,
            text: 'uplachen_procent ' + this.fullName + this.number
        }
    }
},
methods: {
    ...mapActions(['addSsuda', 'reset']),
    save() {
        const { bilet, obespechenie, ssuda, procent } = this
        return this.addSsuda({ bilet, obespechenie, ssuda, procent })
    },
    clear() {
        this.obespechenie = {}
        this.bilet = {}
        this.reset()
    }
}
}

</script>

<style>
input[readonly]{
  background-color:#fff !important;
}
</style>

