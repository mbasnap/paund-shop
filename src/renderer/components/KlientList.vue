<template>
    <div class="body">
        <div class="form-group row">
            <label class="col-sm-3 col-form-label">Family</label>
            <instant  class="col-sm-9" v-model="model" name="family" ></instant>
        </div>
        <div class="form-group row">
            <label class="col-sm-3 col-form-label">Name</label>
            <instant  class="col-sm-9" v-model="model" name="name" ></instant>
        </div>
        <div class="form-group row">
            <label class="col-sm-3 col-form-label">Sername</label>
            <instant  class="col-sm-9 " v-model="model" name="sername" ></instant>
        </div>
        <div class="form-group row">
            <label class="col-sm-3 col-form-label">Passport</label>
            <div class="col-sm-9 p-0">
                <div class="form-row ">
                    <instant  class="col-sm-3 " v-model="model" name="seria" ></instant>
                    <div class="col-sm-1"></div>
                    <instant  class="col-sm-8" v-model="model" name="nomer" ></instant>
                </div>               
            </div>
        </div>
         <div class="form-group row">
            <label class="col-sm-3 col-form-label">vidan</label>
            <instant  class="col-sm-9 " v-model="model" name="vidan" ></instant>
        </div>       
         <div class="form-group row">
            <label class="col-sm-3 col-form-label">idn</label>
            <instant  class="col-sm-9 " v-model="model" name="idn" ></instant>
        </div> 
        <div class="form-group row">
            <label class="col-sm-3 col-form-label">adress</label>
            <div class="col-sm-9 p-0">
                <div class="form-row mb-2">
                    <instant  class="col-sm-5 " v-model="model" name="post" ></instant>
                    <div class="col-sm-1"></div>
                    <instant  class="col-sm-6" v-model="model" name="city" ></instant>
                </div>                    
                <div class="form-row mb-2">
                    <instant  class="col-sm-8" v-model="model" name="street" ></instant>
                    <div class="col-sm-1"></div>
                    <instant  class="col-sm-3" v-model="model" name="home" ></instant>
                </div>                         
            </div>
        </div> 
     <!-- <p class="my-4" v-for="i in 20" :key="i">
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    </p>                     -->
    </div>
</template>

<script>
import {Instant} from "@/widgets"
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {  Instant},    
    computed: {
        ...mapGetters(['klients', 'klient']),
        model: {
            get() {
                return  this.klient
            },
            set({name, value}) {
                this.setKlient({...this.klient, [name]: value})
            }
        }
    },
    methods: {
        ...mapActions(['setKlient']),
    }

}
</script>

<style>

</style>
