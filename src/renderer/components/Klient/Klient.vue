<template>
    <div >
        <instant v-model="selected" name="family"  @select="onSelect"
                :suggest="klients"
                :string="({family, name, sername}) => family + ' ' + name + ' ' + sername">
            <reset slot="rightButton" @reset="onReset"/>
        </instant>
        <div class="form-row">
            <named-instant v-model="selected" name="name" class="col-md-5"/>
            <named-instant v-model="selected" name="sername" class="col-md-7"/>
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
import {NamedInstant} from "@/widgets"
export default {
    components: { MbaInstant, Instant, Reset, NamedInstant},
    data () {
        return {}
    },
    computed: {
        klients () {
            return this.$store.getters['klient/getAll']
        },
        selected: {
            get() {
                return  this.$store.getters['klient/getSelected']
            },
            set({name, value, showSuggests}) {
                let klients = this.$store.getters['klient/startsWith', value]
                this.$store.dispatch('klient/change', {[name]: value})
                if(showSuggests) showSuggests(klients)
            }
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
