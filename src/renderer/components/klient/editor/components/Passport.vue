<template>
<div class="passport">
    <div class="form-row mb-2">
        <named-input class="form-control col-3 mr-1" name="seria" :placeholder="t('seria')" :value="model" />
        
        <suggest ref="passport" class="form-control col" name="number" :placeholder="t('number')"
        :suggest="({ seria, number }) => `${seria} ${number}`" :disabled="disabled"
        :show="(key) => key !== passport"
        :value="model" :options="options" @selectIndex="select">
            <svg-row-down v-show="options.length > 0" class="reset"
            @click="$refs['passport'].highlight(0, true)"/>
        </suggest>
        <div v-if="editMode"  class="col-1" style="text-align: right; line-height: 30px;">
            <svg-trash width="13px;" @click="remove(passport)"/>
        </div>  
        <div v-else-if="value._id && isValid" class="col-1">
            <svg-plus-circle  width="13px;" @click="add"/>
        </div>
        <div v-show="err" class="col-1" id="tooltip-err">
            <svg-exclamation  width="8px;" @click="selectKlient"/>
        </div>
        <b-tooltip target="tooltip-err" variant="danger" triggers="hover">
            Klient exist {{ klient }}
        </b-tooltip>
    </div> 
    <div v-if="editMode" class="form-row mb-2">
        <named-textarea class="form-control col" name="issued" :placeholder="t('issued')" :value="model"/>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { SvgTrash, SvgPlusCircle, SvgRowDown, SvgExclamation } from '@/svg'
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    components: { SvgTrash, SvgPlusCircle, SvgRowDown, SvgExclamation },
    props: { value: Object, disabled: Boolean, editMode: Boolean },
    // inject: [ 'update' ],
    computed: {
        ...mapGetters({
            map: 'klient/map',
            passportsMap: 'klient/passportsMap'
        }),
        klient({ map, err }) {
            const { family, name, sername } = {...map[err]}
            return `${family} ${name} ${sername}`
        },
        passports({ value }) {
            return (value.passports || [])
        },
        err({ passportsMap, model, value }) {
            const lowerCase = v => (v || '').toLowerCase()
            const { seria, number, _id } = model
            const err = passportsMap[lowerCase(seria) + lowerCase(number)]
            return value._id === err ? false : err
        },
        isFields({ model }) {
            return ['seria', 'number'].every(v => {
                return model[v]
            })
        },
        isValid({ isFields, err }) {      
            return [!err, isFields].every(v => v)
        },
        options({ passports }) {
            console.log(passports);
            
           return passports
        },
        passport({ passports }) {
            return passports.passport || 0
        },
        model({ passports, passport }) {
            return { ...passports[passport]} 
        }
    },
    methods: {
        select(passport, silent) {
            console.log(passport);
            
           this.update({ passport })
           if (!silent) this.change() 
        },
        selectKlient() {
           console.log(this.err);
           
        },
        remove(index) {
            const passports = this.passports.filter((v, i) => i !== index)
            const passport = passports.length - 1 || 0
            this.update({ passports, passport })
        },
        readonly() {
            return this.disabled
        },
        input({ name, value }) {
            const passports = [ ...this.passports ]
            passports[this.passport ] = { ...this.model, [name]: value }
            this.update({ passports })
        },
        update(v) {
            this.$emit('input', { ...this.value, ...v })
        },
        add() {
            const passports = [...this.passports, {}]
            const passport = passports.length - 1
            this.update({ passports, passport })
            // this.select(passports.length - 1, true)
        },
        change() {            
            this.$nextTick(() => {
                console.log(this.isValid);
                
                // if (this.isValid) this.$emit('change' )  
            })
        },
        t(v) {
            return this.$t(`klient.${v}`)
        }
    }
}
</script>

<style>

</style>