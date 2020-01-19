<template>
<div class="passport">
    <div class="form-row mb-2">
        <named-input class="form-control col-3 mr-1" name="seria" placeholder="Seria" :value="model" />
        
        <suggest v-if="full" class="form-control col" name="number" placeholder="Number"
        :suggest="tostring" :value="model" :options="options" @select="select"/>

        <custom-select v-else class="form-control col" name="number" placeholder="Number"
        :suggest="tostring" :selected="selected" :options="passport" @select="selectPassport">
                <li v-for="(item, i) in passport.filter((v,i) => i !== selected)" :key="i"
                @click="selectPassport(i)"> {{ tostring(item) }} </li>
        </custom-select>
  
    </div> 
    <div v-if="full" class="form-row mb-2">
        <named-textarea class="form-control col" name="issued" placeholder="Issued" :value="model"/>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    props: { value: Object, disabled: Boolean, full: Boolean },
    inject: [ 'update' ],
    computed: {
        ...mapGetters({
            klients: 'klient/klients',
            map: 'klient/map'
        }),
        passports({ klients }) {
            const passports = ({ _id, passport }) =>
                (passport || []).map(v => ({ ...v, _id }))
            return klients.reduce((arr, v) => [ ...arr, ...passports(v)], [])
        },
        passport({ value, selected }) {
            return (value.passport || [])
                // .filter((v, i) => i != selected)
        },
        selected({ value }) {
            return value.selected || 0
        },
        model({ selected, passport }) {
            return { ...passport[selected]} 
        },
        options({ model, passports, tostring }) {
            const value = tostring(model)
                return passports.filter(v => tostring(v).includes(value))
        }
    },
    methods: {
        select({ _id }) {
            return this.update(this.map[_id])
        },
        selectPassport(selected) {
            return this.update({ ...this.value, selected })
        },
        tostring({ seria, number }) {
            return `${seria || ''} ${number || ''}`
        },
        readonly() {
            return this.disabled
        },
        input({ name, value }) {
            const passport = [ { ...this.model, [name]: value} ]
            this.update({ ...this.value, passport })
        }
    }
}
</script>

<style>

</style>