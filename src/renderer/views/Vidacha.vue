<template>
    <div class="row flex-fill" style="height: 100% !important;">
        <div class="col-8 ">
            <div class="row pt-3 " style="height: 50%;">
                <klient class="klient col-6 "></klient>
                <div class="col border-left">
                    <bilet class="bilet"/>
                    <calculator class="calculator"/>
        <div class="control row  "> 
            <div class="col-6 ">
                <div class="row justify-content-center">
                    <button class="btn btn-primary" @click="clearBilet">clear</button>
                </div>
            </div>
            <div class="col-6">
                <div class="row justify-content-center">
                    <button  class="btn btn-primary">save</button>
                </div>
            </div>                       
        </div>  
                </div>                  
                
            </div>
        
            <div class="row " style="height: 40% !important;">
                <obespechenie class="obespechenie col "></obespechenie>
            </div>
        </div>
        <!-- <div class="col" style="height: 100% !important;"> -->
            <kassa class="col-4"></kassa>       
        <!-- </div> -->
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Kassa from '@/components/Kassa'
import Klient from '@/components/Klient.vue'
import Bilet from "@/components/Bilet.vue"
import Calculator from '@/components/Calculator.vue'
import Obespechenie from '@/components/Obespechenie.vue'
export default {
    components: {Kassa, Klient, Bilet, Calculator, Obespechenie},
    computed: {
        ...mapGetters([])
    },
    methods: {
        ...mapActions(['clearBilet'])
    }
}
</script>

<style >


</style>

