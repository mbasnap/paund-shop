<template> 
    <modal-editor :title="t(type)"
        @save="({close}) => save(values).then(close)">
        <div class="form-row mb-2">
            <named-input class="form-control col-6 mr-1" name="summ" :placeholder="t('summ')"
            :value="model" />
            <named-select class="form-control col" :name="account" :placeholder="t('account')"
            :value="model" :options="Object.keys(accounts[account])" @change="change"
            :tostring="toStringAccount"/>
        </div> 
        <div class="form-row mb-2">
            <named-select class="form-control col" name="klient" :placeholder="t('from')"
            :value="model" :options="users" @change="change"
            :tostring="toStringKlient" :tovalue="v => v._id"/>
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
            accounts: 'accounts',
            users: 'klient/users',
            // nextOrder: 'reestr/nextOrder'
        }),
        account({ type }) {
            return type === 'dt' ? 'ct' : 'dt'
        },
        passports({ value }) {
            // console.log(value);
            
            return []
        },
        model({ value }) {
            return { ...value, summ: toDouble(value.summ) }
        },
        values({ model, account, type }) {
            // const order = { [type]: nextOrder[type]}    
            return {...model, values: [
                { [type]: '301', [account]: model[account], summ: model.summ },
            ]}
        }
    },
    methods: {
        readonly() {
            return this.disabled
        },
        change({ name, value }) {          
            this.value = { ...this.value, [name]: value }
        },
        toStringKlient({ family, name, sername }) {
            return `${family} ${name} ${sername}`
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