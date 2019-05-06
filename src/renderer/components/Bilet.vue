<template>
    <instant  v-model="model" name="Bilet" ></instant>
</template>

<script>
import {Instant} from "@/widgets"
export default {
      data(){
         return {
             model: {}
         }
     },     
    components: {  Instant},    

}
</script>

<style>

</style>
