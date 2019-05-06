<template>
    <div >   
        <div class="body  ">
            
            <instant  v-model="model" name="Ssuda" ></instant>
            <instant v-model="model" name="Procent" ></instant>           
            <instant v-model="model" name="Summ" ></instant>           
        </div>
        <div class="control row "> 
            <div class="col-6 ">
                <div class="row justify-content-center"><button class="btn btn-primary">Cacsel</button></div>
            </div>
            <div class="col-6">
                <div class="row justify-content-center"><button  class="btn btn-primary">Save</button></div>
            </div>                       
        </div>     
    </div>
</template>

<script>
import {Instant} from "@/widgets"

export default {
    components: {  Instant},    
    computed: {},
     data(){
         return {
             model: {}
         }
     },  
    methods: {}
}
</script>

<style >
.calculator .body{
    height: 80%;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.24) */
}
  .calculator .control {
    padding: 10px;
  }
</style>
