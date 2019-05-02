<template>
    <div class="row flex-fill" style="height: 100% !important;">
        <div class="col-md-8 ">
            <div class="row  pt-3 " style="height: 60% !important;">
                <klient class=" col "></klient>                  
                <calculator class=" col border-left text-center"></calculator>
            </div>
            <div class="row" style="height: 40% !important;">
                <obespechenie></obespechenie>
            </div>
        </div>
        <!-- <div class="col" style="height: 100% !important;"> -->
            <kassa class="col"></kassa>       
        <!-- </div> -->
    </div>
</template>

<script>
import Kassa from '@/components/Kassa'
import Klient from '@/components/Klient'
import Calculator from '@/components/Calculator'
import Obespechenie from '@/components/Obespechenie'
export default {
    components: {Kassa, Klient, Calculator, Obespechenie}
    }
</script>


