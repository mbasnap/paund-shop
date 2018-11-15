<template>
    <div >
        <div class=" row border-bottom" style="height: 81% !important;">
            <div class="col">
                <form-instant :selected="selected" name="family" :suggestions="klients"
                    :string="item => item.family + ' ' + item.name"
                    @select="selected => $store.dispatch('klient/select', selected)"
                    @reset="$store.dispatch('klient/clear')"/>
            </div>
        </div>
        <div class=" row " style="height: 19% !important;">
          <control-panel class="col  pt-2"></control-panel> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
import ControlPanel from './ControlPanel.vue'
import {FormInstant} from "@/components/Widgets"
import { log } from 'util';
export default {
    components: {ControlPanel, FormInstant},
    computed: {
        klients () {
            return this.$store.getters['klient/getAll']
        },
        selected () {
            return this.$store.getters['klient/getSelected']
        }
    },
     data(){
         return {
            value: ''     
         }
     },  
    methods: {

    }
}
</script>

<style >

</style>
