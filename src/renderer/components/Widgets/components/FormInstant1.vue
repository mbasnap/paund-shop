<template>
    <vue-instant
        :suggestion-attribute="suggestionAttribute"
        v-model="value"
        @input="changed"
        @click-input="clickInput"
        @click-button="clickButton"
        @selected="selected"
        @key-down="keyDown"
        @key-up="keyUp"
        @clear="clear"
        @escape="escape"
        :suggestions="suggestions"
        name="customName"
        placeholder="custom placeholder"
        type="google"
    ></vue-instant>
</template>

<script>
import axios from 'axios'
import 'vue-instant/dist/vue-instant.css'
import {VueInstant} from 'vue-instant/dist/vue-instant.common'
export default {
    components: {VueInstant},
     data(){
         return {
            value: '',
            suggestionAttribute: 'original_title',
            suggestions: [],
            selectedEvent: ""           
         }
     },   
    methods: {
            clickInput: function() {
                this.selectedEvent = 'click input'
            },
            clickButton: function() {
                this.selectedEvent = 'click button'
            },
            selected: function() {
                this.selectedEvent = 'selection changed'
            },
            enter: function() {
                this.selectedEvent = 'enter'
            },
            keyUp: function() {
                this.showAutocomplete = !this.showAutocomplete
            },
            keyDown: function() {
                this.selectedEvent = 'keyDown pressed'
            },
            keyRight: function() {
                this.selectedEvent = 'keyRight pressed'
            },
            clear: function() {
                this.value = ''
            },
            escape: function() {
                // this.selectedEvent = 'escape'
            },
             changed: function() {
                var that = this
                console.log(this.value)
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

form.searchbox.sbx-google {
    width: 200px;
    height: 35px;
    
}
button.sbx-google__submit {
    background-color: #e9ecef;
    border: 1px solid #ced4da;
        width: 38px;
}
button.sbx-google__submit svg {
    width: 16px;
    height: 16px;
    fill: #495057;
}
.sbx-google__reset svg {
    margin: 0px;
}
.sbx-google__input:focus,
.sbx-google__input:active {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
button.sbx-google__reset {
    right: 41px;
}
input.sbx-google__input {
    padding-right: 65px;
}
</style>
