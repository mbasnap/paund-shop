<template>
    <div >
        <instant v-model="model" name="family"  @select="setKlient"
                :suggest="klients"
                :string="({family, name, sername}) => family + ' ' + name + ' ' + sername">
            <reset slot="rightButton" @reset="setKlient({})"/>
        </instant>
        <div class="form-row">
            <named-instant v-model="model" name="name" class="col-md-5"/>
            <named-instant v-model="model" name="sername" class="col-md-7"/>
        </div>
        <div class="form-row">
            <named-instant class="col-md-3" v-model="model" name="seria" :suggest="klients"/>
            <named-instant class="col-md-9" v-model="model" name="nomer" :suggest="klients"/>
        </div> 
        <instant v-model="model" name="idn" :suggest="klients"></instant>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {MbaInstant, Instant, Reset} from "@/components/Widgets"
import {NamedInstant} from "@/widgets"
export default {
    components: { MbaInstant, Instant, Reset, NamedInstant},
    computed: {
        ...mapGetters(['klients', 'klient']),
        model: {
            get() {
                return  this.klient
            },
            set({name, value}) {
                this.setKlient({...this.klient, [name]: value})
            }
        }
    },
    methods: {
        ...mapActions(['setKlient']),
        // onChange(name, {value, showSuggests})  {
        //     let startsWith = (item) => item[name].startsWith(value)
        //     this.$store.dispatch('klient/change', {[name]: value})
        //     if(showSuggests) showSuggests(this.klients.filter(startsWith))
        // }
    }
}
</script>

<style> </style>
