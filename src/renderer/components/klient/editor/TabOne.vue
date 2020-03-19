<template>
    <div>
        <div class="form-row mb-2">
            <suggest ref="klients" class="form-control col" name="family" :placeholder="t('family')"
            :suggest="({ family, name, sername }) => `${family} ${name} ${sername}`"       
            v-model="model" :options="options" @select="update">
                <svg-row-down v-show="!value._id && !disabled" class="reset" @click="$refs['klients'].highlight(0, true)"/>
            </suggest>
            <div v-if="editMode" class="col-1" style="text-align: right; line-height: 30px;">
                <svg-trash width="12px;" @click="$emit('remove')"/>
            </div>  
            <div v-else-if="!disabled" class="col-1" style="text-align: right; line-height: 30px;">
                <svg-reset  width="8px;" @click="$emit('reset')"/>
            </div>  
        </div>
        <div class="form-row mb-2">
            <named-input class="form-control col-5 mr-1" name="name" :placeholder="t('name')" v-model="model"/>
            <named-input class="form-control col" name="sername" :placeholder="t('sername')" v-model="model"/>
        </div>
        <div class="form-row mb-2">
            <named-input class="form-control col-3" :placeholder="t('seria')" name="seria" v-model="passport"/>
            <div class="col">
                <div class="row m-0">
                    <suggest class="form-control col" name="number" :placeholder="t('number')"
                    :suggest="({ passport }) => `${passport.seria} ${passport.number}`"
                    v-model="passport" :options="passports" @select="update"/>            
                    <div v-show="err" id="tooltip-err" class="border-0 form-control col-1">
                        <svg-exclamation  width="8px;" @click="update(err)"/>
                    </div>
                    <div v-if="!editMode" class="border-0 form-control col-1">
                        <svg-plus-circle  width="13px;" @click="add(model)"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="editMode" class="form-row mb-2">
            <named-textarea class="form-control col" name="issued" :placeholder="t('issued')" v-model="passport"/>
        </div>
        <div class="form-row mb-2">
            <named-input class="form-control col" name="idn" :placeholder="t('idn')" v-model="model"/>   
        </div>
        <b-tooltip target="tooltip-err" variant="danger" triggers="hover">
            Klient {{ fio }} exist
        </b-tooltip>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mix} from './components'
import { SvgRowDown, SvgTrash, SvgReset, SvgExclamation, SvgPlusCircle } from '@/svg'
export default {
    mixins: [ mix ],
    props: { value: Object, disabled: Boolean, editMode: Boolean },
    components: { SvgRowDown, SvgTrash, SvgReset, SvgExclamation, SvgPlusCircle },
    inject: [ 'update' ],
    computed: {
        ...mapGetters({
            docs: 'klient/docs',
            group: 'klient/group',
        }),
        options({ value, group }) {
            return Object.entries(group).map(([key, [v]]) => ({...v, key}))
                .filter(({ family }) => family.includes(value.family || ''))
        },
        passports({ group, model }) {
            return (group[model.key] || []).filter(v => v._id !== model._id)
        },
        model: {
            get() {
                return {...this.value}
            },
            set({ name, value }) {
                this.update({ ...this.value, [name]: value })
                if(name === 'family')  this.$refs['klients'].highlight(0)              
            }
        },
        passport: {
            get() {
                return {...this.model.passport}
            },
            set({ name, value }) {
                const passport = { ...this.passport, [name]: value }
                this.update({ ...this.value, passport }) 
            }
        },
        passportsMap({ model, docs }) {
            return docs.filter(v => v._id !== model._id)
                .reduce((cur, v) => ({...cur, [this.passportId(v)]: v }), {})
        },
        err({ passportsMap, model }) {
            return passportsMap[this.passportId(model)]
        },
        fio({ err }) {
            const { family, name, sername } = {...err}
            return `${family} ${name} ${sername}`
        },
        isValid({ model, passport, err }) {
            const fioValid = ['family', 'name', 'sername'].every(v => model[v])
            const passportValid = ['seria', 'number'].every(v => passport[v])
            return [fioValid, passportValid, !err].every(v => v)
        }
    },
    methods: {
        passportId({ passport }) {
            const { seria, number } = {...passport}
            return ('' + seria + number).toLowerCase()
        },
        add({ family, name, sername }) {
            this.$emit('reset')
            this.$nextTick(() => {
                this.update({ family, name, sername })
            })
        },
        select(v) {
            this.update(v)
        },
        change() {
            if (this.isValid) this.$emit('change' ) 
        },
        t(v) {
            return this.$t(`klient.${v}`)
        }
    }
}
</script>

<style></style>