<template>
    <div >
        <div class=" row border-bottom" style="height: 81% !important;">
            <div class="col">
                <form-instant v-model="value" @action="controlEvents" />
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
        suggestions (prop) {
            return this.$store.getters['klient/getAll'].filter(function(item) {
                console.log(item);
                
                return true
                // return item[prop].startsWith(this.value)
            })
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
             context.showSuggestions(this.suggestions('title'))
        },
        selected ({selected, context}) {
            context.setValue(selected.title)
        },
        resetAction (context) {
           
        }
    }
}
</script>

<style >

</style>
