<template>
    <div >
        <div class=" row border-bottom" style="height: 81% !important;">
            <form-instant
                class="col"
                :suggestion-attribute="suggestionAttribute"
                v-model="value"
                @input="changed"
                :suggestions="suggestions"
                name="customName"
                placeholder="Bilet"
                type="google"
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
        ...mapGetters({
            title: 'calkulator/title'
        })
    },
     data(){
         return {
            value: '',
            suggestionAttribute: 'original_title',
            suggestions: []      
         }
     },  
    methods: {

             changed: function() {
                var that = this
                if (!this.value) return
                this.suggestions = []
                axios.get('https://api.themoviedb.org/3/search/movie?api_key=342d3061b70d2747a1e159ae9a7e9a36&query=' + this.value)
                    .then(function(response) {
                        response.data.results.forEach(function(a) {
                            that.suggestions.push(a)
                        })
                    })
            } 
    }
}
</script>

<style >

</style>
