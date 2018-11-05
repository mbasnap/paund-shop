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
import { log } from 'util';
export default {
    components: {ControlPanel, FormInstant},
    computed: {
        suggestions () {
            let byTitle = ({title}) => title.startsWith(this.value)
            return this.$store.getters['klient/getAll'].filter(byTitle)
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
        escape (context) {
            context.sugested(false)
        },
        arrowDown (context) {
            context.sugested(true)
        },
        onChanget (context) {
             context.showSuggestions(this.suggestions, 'title')
        },
        selected ({selected, context}) {
            context.setValue(selected.title)
            context.sugested(false)
        },
        reset (context) {
            context.setValue('')
        }
    }
}
</script>

<style >

</style>
