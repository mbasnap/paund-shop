<template> 
    <modal-editor :title="type" :disabled="disabled"
        @save="({close}) => save(values).then(close)">
        <div class="form-row mb-2">
            <named-input class="form-control col-6 mr-1" name="summ" placeholder="Summ"
            :value="model" />
            <named-select class="form-control col" :name="account" placeholder="Account"
            :tostring="v => v + ' ' + accounts[account][v]"
            :value="model" :options="Object.keys(accounts[account])"/>
        </div> 
        <div class="form-row mb-2">
            <named-select class="form-control col" name="from" placeholder="From"
            :value="model" :options="users"/>
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
            // filter: true
        }
    },
    computed: {
        ...mapGetters({
            accounts: 'accounts',
            klients: 'klient/klients',
            nextOrder: 'reestr/nextOrder'
        }),
        disabled({ value }) {
            // return !Object.entries(value)
            // .some(([ key, value ]) => this.value[key] !== value ? value : undefined)
        },
        users({ klients }) {
            return (klients || []).map(v => this.tostringUser(v))
        },
        account({ type }) {
            return type === 'dt' ? 'ct' : 'dt'
        },
        model({ value }) {
            return { ...value, summ: toDouble(value.summ) }
        },
        values({ model, type, nextOrder }) {
            const { title, from } = model
            return [
                { [type]: '301', ...model },
                { [type]: '002', ...model, number: nextOrder[type] }
            ]
        }
    },
    methods: {
        readonly() {
            return this.disabled
        },
        change({ name, value }) {
            this.value = { ...this.value, [name]: value }
        },
        tostringUser(v) {
            const { family, name, sername } = v
            return `${family} ${name} ${sername}`
        }
    }
}
</script>
<style>

</style>