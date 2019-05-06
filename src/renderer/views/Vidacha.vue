<template>
    <div class="row flex-fill" style="height: 100% !important;">
        <div class="col-8 ">
            <div class="row pt-3 " style="height: 300px !important;">
                <klient class="klient col-6 "></klient>
                <div class="col border-left">
                    <bilet class="bilet"/>
                    <calculator class="calculator"/>
                </div>                  
                
            </div>
        
            <div class="row " style="height: 40% !important;">
                <obespechenie></obespechenie>
            </div>
        </div>
        <!-- <div class="col" style="height: 100% !important;"> -->
            <kassa class="col-4"></kassa>       
        <!-- </div> -->
    </div>
</template>

<script>
import Kassa from '@/components/Kassa'
import Klient from '@/components/Klient.vue'
import Bilet from "@/components/Bilet.vue"
import Calculator from '@/components/Calculator.vue'
import Obespechenie from '@/components/Obespechenie.vue'
export default {
    components: {Kassa, Klient, Bilet, Calculator, Obespechenie}
    }
</script>

<style >


</style>

