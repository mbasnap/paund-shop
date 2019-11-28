<template>
    <div class="row flex-fill vidacha">
        <div class="col-8">
            <div class="row">
                <klient v-model="klient" class="col p-2"
                @select="v => klient = v"
                @reset="klient = {}"/>
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
// import { toDouble, summ } from '@/functions'
import Kassa from '@/components/Kassa'
import Klient from '@/components/Klient.vue'
import Obespechenie from '@/components/obespechenie'
import Number from './Number.vue'
import Bilet from './Bilet.vue'
export default {
components: { Kassa, Klient, Number, Bilet, Obespechenie },
data () {
    return {
        klient: {},
        bilet: {},
        obespechenie: [ {} ],
    }
},
computed: {
    ...mapGetters(['klients']),
    disabled() {
        return [ this.klient, this.bilet, this.obespechenie ]
            .some(({ valid })=> !valid)
    }
},
methods: {
    ...mapActions([ 'addSsuda' ]),
    save() {
        const { bilet, obespechenie } = this
        return this.addSsuda({ ...bilet, obespechenie })
    },
    clear() {
        this.klient = {}
        this.bilet = {}
        this.obespechenie = [{}]
    }
}
}

</script>

<style>
input[readonly]{
  background-color:#fff !important;
}
</style>

