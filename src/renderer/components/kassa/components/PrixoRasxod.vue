<template> 
    <modal-editor :title="type" :disabled="disabled" @save="editor => onSave(editor, model)" >
        <div class="form-row mb-2">
            <named-input class="form-control col-6 mr-1" name="summ" placeholder="Summ" :value="model" />
            <named-select class="form-control col" :name="account" placeholder="Account"
            :value="model" :options="Object.keys(accounts[account])"
            :tostring="v => v + ' ' + accounts[account][v]"/>
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
            value: {}
        }
    },
    computed: {
        ...mapGetters({
            accounts: 'accounts',
            lastOrder: 'reestr/lastOrder'
        }),
        disabled({ value }) {
            // return !Object.entries(value)
            // .some(([ key, value ]) => this.value[key] !== value ? value : undefined)
        },
        account({ type }) {
            return type === 'dt' ? 'ct' : 'dt'
        },
        title({ value }) {
            return value.title
        },
        order({ value, title, type, lastOrder }) {
            const number = lastOrder[type] + 1
            const from = value.from || ''
            return { title, number, from }
        },
        model({ value, type }) {
            const summ = toDouble(value.summ)
            return { ...value, [type]: '301', summ }
        }
    },
    methods: {
        readonly() {
            return this.disabled
        },
        change({ name, value }) {
            this.value = { ...this.value, [name]: value }
        },
        async onSave(modal) {
            const { order, model } = this
            await this.save({ order, values: [model] })
            modal.close()
        }
    }
}
</script>
<style>

</style>