<template>
    <div >
        <instant v-model="selected" name="family" :suggest="klients" @select="onSelect"
                :string="({family, name, sername}) => family + ' ' + name + ' ' + sername">
            <reset slot="rightButton" @reset="onReset"/>
        </instant>
        <div class="form-row">
            <div class="form-group col-md-5">
                <mba-instant :value="selected['name']"
                         @input="value => onChange('name', value)"
                         :toString="(item) => item['name']"
                     ></mba-instant>
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
        selected() {
            return  this.$store.getters['klient/getSelected']
        }
    },
    methods: {

        onChange(name, {value, showSuggests})  {
            let startsWith = (item) => item[name].startsWith(value)
            this.$store.dispatch('klient/change', {[name]: value})
            if(showSuggests) showSuggests(this.klients.filter(startsWith))
        },
        onSelect (selected) {
            this.$store.dispatch('klient/select', selected)
        },
        onReset () {
            this.$store.dispatch('klient/clear')
        }
    }
}
</script>

<style> </style>
