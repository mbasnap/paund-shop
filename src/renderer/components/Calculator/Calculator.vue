<template>
    <div >
        <div class=" row border-bottom" style="height: 81% !important;">
            <form-instant class="col" v-model="value" @action="controlEvents" ></form-instant>
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
        suggestions () {
            return this.$store.getters['klient/getAll']
        }
    },
     data(){
         return {
            value: ''     
         }
     },  
    methods: {
      controlEvents (action, context) {
        var fn = (this[action])
        if (fn) fn(context)    
      },
        arrowDown (context) {
            context.sugested(true)
        },
        onChanget (context) {
             context.showSuggestions(this.suggestions, 'title')
        },
        reset (context) {
            context.setValue('')
        }
    }
}
</script>

<style >

</style>
