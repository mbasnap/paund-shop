<template>

<b-modal v-model="showMomal"  title="obespechenie" 
        @hidden="row = {}"
        @ok="$emit('save', row)">

        <instant  class="col p-0" v-model="model" name="title" ></instant>
    <div class="form-group ">
        <!-- <label class="col-sm-3 col-form-label"></label> -->
        <!-- <div class=""> -->
            <div class="form-row row pr-2 justify-content-center">
                <instant  class="col mr-2" v-model="model" name="proba" />
                <!-- <div class="col-sm-1"></div> -->
                <instant  class="col mr-2" v-model="model" name="ves" />
                <!-- <div class="col-sm-1"></div> -->
                <instant  class="col mr-2" v-model="model" name="derty" />
                <!-- <div class="col-sm-1"></div> -->
                <instant  class="col" v-model="model" name="ocenca" />
            </div>               
        <!-- </div> -->
    </div>
</b-modal>  
</template>

<script>
import {Instant} from "@/widgets"
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {  Instant},
    props: {
         value: Boolean,
    },
    data() {
        return {
            row: {}
        }
    },    
    computed: {
        // ...mapGetters(['obespechenie']),
        showMomal: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('input', v)
            }
        },
        model: {
            get() {
                return  this.row
            },
            set({name, value}) {
                this.row[name] = value
            }
        }
    },
    methods: {}
}
</script>

<style>

</style>
