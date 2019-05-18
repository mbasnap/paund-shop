<template>

<b-modal class="obespechenie-list" v-model="showMomal"  title="obespechenie" @ok="$emit('ok', row)">

    <instant  class="col p-0" v-model="model" name="title" ></instant>
    <div class="form-group ">
        <div class="form-row row pr-2 justify-content-center">
            <instant  class="col mr-2" v-model="model" name="proba" />
            <instant  class="col mr-2" v-model="model" name="ves" />
            <instant  class="col mr-2" v-model="model" name="derty" />
            <instant  class="col" v-model="model" name="ocenca" />
        </div>               
    </div>

</b-modal> 

</template>

<script>
import {Instant} from "@/widgets"
// import { mapActions, mapGetters } from 'vuex'
export default {
    components: {  Instant},
    props: {
        row: Object,
    },
    data() {
        return {
            showMomal: false
        }
    },
    watch: {
        row () {
            this.showMomal = true
        }
    },

    computed: {

        model: {
            get() {
                return  this.row
            },
            set({name, value}) {
                 this.row[name] = value
            }
        }
    },

}
</script>

<style>

</style>
