<template>
<div >
        <instant v-model="selected" name="family" :suggest="klients"
                 @select="onSelect"
                 :groupe="false"
                :string="({family, name, sername}) => family + ' ' + name + ' ' + sername">
            <reset slot="rightButton" @reset="onReset"/>
        </instant>
    <div class="form-row">
        <div class="form-group col-md-5">
            <instant v-model="selected" name="name" :suggest="klients" ></instant>
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
import {Searcher, DropdownIcon, Instant, Reset} from "@/components/Widgets"
export default {
    components: {Searcher, DropdownIcon, Instant, Reset},
    data () {
        return {}
    },
    watch: {},
    computed: {
        klients () {
            return this.$store.getters['klient/getAll']
        },
        selected:{
            get () {
                return this.$store.getters['klient/getSelected']
            },
            set(payload) {
                this.$store.dispatch('klient/changeSelected', payload)
            }
        }
    },
    methods: {
        // log() {console.log(this)},
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
