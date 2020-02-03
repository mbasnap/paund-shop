<template>
<div class="passport">
    <div class="form-row mb-2">
        <named-input class="form-control col-3 mr-1" name="seria" :placeholder="t('seria')" :value="model" />
        
        <suggest v-if="!value._id || !passports.length || full" class="form-control col" name="number"
        :placeholder="t('number')"
        :suggest="suggest" :value="model" :options="klients" @select="update"/>

        <custom-select v-else class="form-control col" name="number" :placeholder="t('number')"
        :suggest="tostring" :selected="passport" :options="passports">
                <li v-for="(item, i) in passports" :key="i" @click="select(i)">
                    <div class="row m-0">
                        <div class="col hover">{{ tostring(item) }}</div>
                        <div class="col-2">
                            <svg-trash width="13px;" @click="remove(i)"/>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="row m-0">
                        <div class="col">
                            <svg-plus-circle width="13px;" @click="select(passports.length)"/>
                        </div>
                    </div>
                </li>
        </custom-select>
  
    </div> 
    <div v-if="full" class="form-row mb-2">
        <named-textarea class="form-control col" name="issued" :placeholder="t('issued')" :value="model"/>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { SvgTrash, SvgPlusCircle} from '@/svg'
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    components: { SvgTrash, SvgPlusCircle },
    props: { value: Object, disabled: Boolean, full: Boolean },
    inject: [ 'update', 'save' ],
    computed: {
        ...mapGetters({
            klients: 'klient/klients'
        }),
        passports({ value }) {
            return (value.passports || [])
        },
        passport({ value }) {
            return value.passport
        },
        model({ passports, passport }) {
            return { ...passports[passport]} 
        },
        options({ model, passports, tostring }) {
            const value = tostring(model)
                return passports.filter(v => tostring(v).includes(value))
        }
    },
    methods: {
        select(passport) {
            return  this.update({ ...this.value, passport })
        },
        remove(index) {
            const passports = this.passports.filter((v, i) => i !== index)
            return this.save({ ...this.value, passports, passport: 0 })
        },
        tostring({ seria, number }) {
            return `${seria || ''} ${number || ''}`
        },
        readonly() {
            return this.disabled
        },
        input({ name, value }) {
            const passports = [ ...this.passports ]
            passports[this.passport] = { ...this.model, [name]: value }
            this.update({ ...this.value, passports })
        },
        suggest({passports, passport}) {
            const value = (passports || [])[passport]
            return this.tostring({ ...value })
        },
        t(v) {
            return this.$t(`klient.${v}`)
        }
    }
}
</script>

<style>

</style>