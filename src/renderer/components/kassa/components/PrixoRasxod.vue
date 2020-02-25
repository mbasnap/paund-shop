<template> 
    <modal-editor :title="t(type)"
        @save="({close}) => save(values).then(close)">
        <div class="form-row mb-2">
            <named-input class="form-control col-6 mr-1" name="summ" :placeholder="t('summ')"
            :value="model" />
            <named-select class="form-control col" :name="account" :placeholder="t('account')"
            :value="model" :options="options" @change="change" :tostring="toStringAccount"/>
        </div> 
        <div class="form-row mb-2">
            <named-select class="form-control col" name="klient" :placeholder="t('from')"
            :value="model" :options="users" @change="change"
            :tostring="toStringKlient" :tovalue="toValueKlient"/>
            <div class="col-1" style="text-align: right; line-height: 30px;">
                <svg-address-card width="25px;" @click="showModal('edit')"/>
            </div>            
            <!-- <named-select class="form-control col" name="passport" placeholder="Passport"
            :tostring="toStringPassport" :tovalue="(v, i) => i"
            :value="model" :options="passports"/> -->
        </div> 
        <div class="form-row mb-2">
            <named-textarea class="form-control col" name="title"
            :placeholder="t('discription')" :value="model"/>
        </div>        
    </modal-editor>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { toDouble } from '@/functions'
import ModalEditor from '@/widgets/Modal.vue'
import { Editor } from '@/components/klient/editor/index.js'
import { SvgAddressCard } from '@/svg'
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    components: { ModalEditor, SvgAddressCard },
    props: { type: String, save: Function },
    data() {
        return {
            value: {},
        }
    },
    computed: {
        ...mapGetters({
            map: 'klient/map',
            company: 'company',
            settings: 'settings'
        }),
        accounts({ settings }) {
            return {...settings.accounts }
        },
        account({ type }) {
            return type === 'dt' ? 'ct' : 'dt'
        },
        passports({ value }) { return []},
        model({ value }) {
            return { ...value, summ: toDouble(value.summ) }
        },
        values({ model, account, type }) {
            return {...model, values: [
                { [type]: '301', [account]: model[account], summ: model.summ },
            ]}
        },
        options({ accounts, account }) {
            const excludes = v => !(accounts.excludes || []).includes(v)
            return Object.keys({...accounts[account] }).filter(excludes)
        },
        users({ company, map }) {
            return (company.users || []).map(v => map[v]).filter(v => v)
        }
    },
    methods: {
        ...mapActions({
          saveKlient: 'klient/save',
        //   remove: 'klient/remove'
        }),
        showModal (title) {        
            const value = {...this.map[{...this.value}.klient] }
            this.$modal.show(Editor, { title, value, save: this.saveKlient }, { height: 'auto' })
        },
        readonly() {
            return this.disabled
        },
        change({ name, value }) {
            this.value = { ...this.value, [name]: value }
        },
        toStringKlient({ family, name, sername }) {
            return `${family} ${name} ${sername}`
        },
        toValueKlient(v) {
            return {...v}._id
        },
        toStringPassport({ seria, number }) {
            return `${seria} ${number}`
        },
        toStringAccount(v) {
            const { accounts, account } = this
            const title = accounts[account][v]
            return `${v} ${title}`
        },
        t(v) {
            return this.$t(`prixod-rasxod.${v}`)
        }
    }
}
</script>
<style>

</style>