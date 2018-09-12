<template>
    <div class="row flex-fill">
        <div class="col-md-8">
            <div class="row h-50">
                <klient class="col-md-7 pr-2"></klient>
                <calculator class="col-md-5"></calculator>
            </div>
            <obespechenie></obespechenie>
        </div>
        <div class="col">
        <kassa></kassa>       
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


<style>


</style>

