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
            :value="model" :options="usersOptions" @change="change"
            :tostring="fio" :tovalue="toValueKlient"/>
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
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    components: { ModalEditor },
    props: { type: String, save: Function },
    data() {
        return {
            value: {},
        }
    },
    computed: {
        ...mapGetters({
            users: 'users',
            company: 'company',
        }),
        accounts({ company }) {
            const reduce = key => ({...company.accounts}[key] || [])
                .reduce((cur, { acc, title }) => ({...cur, [acc]: title }), {})
            return { dt: reduce('dt'), ct: reduce('ct') }
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
        excludesUsers({ company }) {
            const excludes = (company['excludes-users'] || '').split(',')
            return excludes.map(v => v.trim())
        },
        usersOptions({ users, excludesUsers, fio }) {
            return users
                .filter(({ name }) => !excludesUsers.includes(name))
                    .filter(v => v.active && fio(v))
        },
        options({ accounts, account, company }) {
            const excludes = v => !(company.excludes || []).includes(v)
            return Object.keys({...accounts[account] }).filter(excludes)
        }
    },
    methods: {
        // ...mapActions({}),
        readonly() {
            return this.disabled
        },
        change({ name, value }) {
            this.value = { ...this.value, [name]: value }
        },
        fio(v) {
            const { family = '', name = '', sername = '' } = {...v.fio }
            return `${family} ${name} ${sername}`.trim()
        },
        toValueKlient(v) {
            return {...v}._id
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