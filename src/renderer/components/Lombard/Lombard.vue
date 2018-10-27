<template>
    <div class="row flex-fill">
        <div class="col-md-8">
            <div class="row  h-50">
                <klient class=" col "></klient>                  
                <calculator class=" col border-left "></calculator>
            </div>
            <div class="row  h-50">
                <obespechenie></obespechenie>
            </div>
        </div>
        <div class="col">
            <kassa class="row"></kassa>       
        </div>
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


