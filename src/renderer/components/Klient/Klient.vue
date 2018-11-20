<template>
<div >
<<<<<<< HEAD
        <instant v-model="selected" name="family" :suggest="klients"
                 @select="onSelect"
=======
        <instant v-model="selected" name="family" :suggest="klients" @select="onSelect"
>>>>>>> 1a5f1e1ae15fddbee9d7fc2322f14d5763d91045
                :string="({family, name, sername}) => family + ' ' + name + ' ' + sername">
            <reset slot="rightButton" @reset="onReset"/>
        </instant>
    <div class="form-row">
        <div class="form-group col-md-5">
            <mba-instant v-model="value" name="name"></mba-instant>
        </div>
        <div class="form-group col-md-7">
            <instant v-model="selected" name="sername" :suggest="klients"></instant>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-3">
            <instant v-model="selected" name="seria" :suggest="klients"></instant>
        </div>
        <div class="form-group col-md-9">
            <instant v-model="selected" name="nomer" :suggest="klients"></instant>
        </div>
    </div> 
    <instant v-model="selected" name="idn" :suggest="klients"></instant>

</div>



</template>

<script>
import {MbaInstant, Instant, Reset} from "@/components/Widgets"
export default {
    components: { MbaInstant, Instant, Reset},
    data () {
        return {}
    },
    computed: {
        klients () {
            return this.$store.getters['klient/getAll']
        },
        selected:{
            get () {
                return this.$store.getters['klient/getSelected']
            },
            set({name, value}) {
                this.$store.dispatch('klient/changeSelected', {[name]: value})
            }
        },
        value:{
            get () {
                return this.$store.getters['klient/getSelected']
            },
            set({payload, showSuggests}) {
                this.$store.dispatch('klient/select', payload)
                if(showSuggests) showSuggests(this.klients, function(item, value){
                    return item.startsWith(value)
                })
            }
        }
    },
    methods: {
        onSelect (selected) {
            this.$store.dispatch('klient/select', selected)
        },
        onReset () {
            this.$store.dispatch('klient/clear')
        }
    }
}
</script>

<style>

</style>
