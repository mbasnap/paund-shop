<template>
    <div >
        <div class=" row border-bottom" style="height: 81% !important;">
            <form-instant class="col"
                v-model="value"
                @reset="onReset"
                @arrowDown="arrowDown"
                :suggestions="klients"
                name="title"
             ></form-instant>
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
export default {
    components: {ControlPanel, FormInstant},
    computed: {
        ...mapGetters('klient', {
            'klients': 'getAll'
        })
    },
     data(){
         return {
            value: '',
            suggestions: []      
         }
     },  
    methods: {
        arrowDown (o) {
            o.showSuggestions(true)
        },
        onReset (o) {
            o.setValue('')
            o.setFocus()
        }
    }
}
</script>

<style >

</style>
