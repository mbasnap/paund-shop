<template>
    <div class="row flex-fill vidacha">
        <div class="col-8">
            <div class="row">
                <klient class="col-6 p-2" v-model="klient"/>
                <div class="col border-left p-2">
                    <bilet ref="bilet" class="mb-2" v-model="biletModel"/> 
                    <control class="mb-2" :saveBtn="validate" @save="save" @clear="clear"/>
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
import Control from './Control.vue'
import {toDouble, procent, summ} from '@/functions'
export default {
    components: {Kassa, Klient, Number, Bilet, Obespechenie, Control},
    data () {
        return {
            klient: {},
            bilet: {},
            obespechenie: {},
        }
    },
    computed: {
        control() {},
        validate() {},
        biletModel: {
            get() {
                return this.bilet
            },
            set(v) {
                console.log(v)
                this.bilet = v || {}
            }
        }
    },
    methods: {
        async save () {},
        clear () {
            this.bilet = {}
        }
    }
}

</script>

<style>
input[readonly]{
  background-color:#fff !important;
}
</style>

