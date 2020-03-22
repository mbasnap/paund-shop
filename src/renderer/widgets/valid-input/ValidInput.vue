<template>
    <div class="form-group">

        <label >{{label}}</label>

        <input class="form-control"
        :autocomplete="autocomplete"
        v-model="model" 
        :type="type"
        :autofocus="autofocus"
        v-bind:class="className"
        :placeholder="placeholder">

        <div class="invalid-feedback" >
            <slot></slot>
        </div>
    </div>    
</template>

<script>
import Input from './model'
export default {
props: {
    label: '',
    type: '',
    placeholder: '',
    autofocus: false,
    isValid: true,
    autocomplete: '',
    value: ''
},
data(){
    return {
        // value: ''
    }
},

computed: {
    model: {
        get(){
            return this.value
        },
        set(value){
            // this.value = value
            this.$emit('input', value)
        }
    },
    className(){
        return !this.isValid ? 'is-invalid' 
                    : this.value ? 'is-valid' : ''
    }

},
methods: {

}
}

</script>

<style scoped>
.form-group {
    height: 75px;
}
</style>
