<template> 
    <modal-editor :title="type"
        @save="({close}) => save(values).then(close)">
        <div class="form-row mb-2">
            <named-input class="form-control col-6 mr-1" name="summ" placeholder="Summ"
            :value="model" />
            <named-select class="form-control col" :name="account" placeholder="Account"
            :tostring="toStringAccount"
            :value="model" :options="Object.keys(accounts[account])"/>
        </div> 
        <div class="form-row mb-2">
            <named-select class="form-control col" name="klient" placeholder="From"
            :tostring="toStringKlient" :tovalue="v => v._id"
            :value="model" :options="users"/>
            <!-- <named-select class="form-control col" name="passport" placeholder="Passport"
            :tostring="toStringPassport" :tovalue="(v, i) => i"
            :value="model" :options="passports"/> -->
        </div> 
        <div class="form-row mb-2">
            <named-textarea class="form-control col" name="title"
            placeholder="Discription" :value="model"/>
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
            nextOrder: 'reestr/nextOrder'
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
        values({ model, account, type, nextOrder }) {
            const order = { [type]: nextOrder[type]}            
            return {...model, order, values: [
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
        }
    }
}
</script>
<style>

</style>