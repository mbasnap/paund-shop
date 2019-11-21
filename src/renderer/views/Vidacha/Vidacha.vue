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
import Obespechenie from '@/components/obespechenie'
import Number from './Number.vue'
import Bilet from './Bilet.vue'
export default {
components: { Kassa, Klient, Number, Bilet, Obespechenie },
data () {
    return {
        bilet: {},
        obespechenie: [{}],
    }
},
computed: {
    ...mapGetters(['klient']),
    disabled() {
        const klient = Object.keys(this.klient).length
        const bilet = Object.keys(this.bilet).length
        return !klient || !bilet
    },
    ocenca() {
        const type = 1
        const summ = this.bilet.ocenca
        const count = this.obespechenie.length
        return { summ, type, count }
    }
},
methods: {
    ...mapActions(['addSsuda', 'reset']),
    save() {
        const { bilet, ocenca, obespechenie } = this
        return this.addSsuda({ ...bilet, ocenca, obespechenie})
    },
    async clear() {
        this.bilet = {}
        console.log(this.obespechenie);
        
        this.obespechenie = []
        await this.$nextTick()
        this.obespechenie = [{}]
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

