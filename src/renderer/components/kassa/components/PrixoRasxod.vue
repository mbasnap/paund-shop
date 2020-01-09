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
        ...mapGetters(['accounts']),
        disabled({ value }) {
            // return !Object.entries(value)
            // .some(([ key, value ]) => this.value[key] !== value ? value : undefined)
        },
        account({ type }) {
            return type === 'dt' ? 'ct' : 'dt'
        },
        model({ value, type }) {
            const summ = toDouble(value.summ)
            return { ...value, [type]: '301', summ }
        }
    },
    methods: {
        // ...mapActions({ save: 'reestr/save' }),
        readonly() {
            return this.disabled
        },
        change({ name, value }) {
            this.value = { ...this.value, [name]: value }
        },
        async onSave(modal) {
            await this.save([this.model])
            modal.close()
            // const value = await this.save([this.model])
            // return close(this.afterSave(value))
        }
    }
}
</script>
<style>

</style>