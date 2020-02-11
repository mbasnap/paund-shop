<template> 
    <modal-editor ref="modal-editor" :title="title" 
    @save="onsave().then(v => editor.close())" >
        <div class="row mb-3 border-bottom" style="height: 160px;">
            <div class="col" v-html="vozvrat">
            </div>
            <div class="col-5">
                <named-input class="form-control col mb-2" name="pay" placeholder="pay"
                :value="{ pay }"/>
            </div>
        </div>
        <vidacha-bilet ref="vidacha" class="row" v-model="model" :type="type"/>
    </modal-editor>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import ModalEditor from '@/widgets/Modal.vue'
import VidachaBilet from '@/components/vidacha/components/Bilet.vue'
import { getOcenca, rorrect, toNumber, mult, toDouble, diff } from '@/functions'
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    components: { ModalEditor, VidachaBilet },
    props: {
        title: String,
        value: { type: Object,
            default() {
                return {}
            }
        },
        save: Function
    },
    provide() {
        return { update: this.update, save: this.save }
    },
    data() {
        return {
            data: {}
        }
    },
    computed: {
        vozvrat({ value }) {
            return value.$el.outerHTML
        },
        pay({ data }) {
            return toDouble(data.pay)
        },
        bilet({ value }) {
            return {...value.value}
        },
        model: {
            get({ data, bilet }) {
                const { days, xDisc } = { ...bilet, ...data }
                return { ...data, days, xDisc }
            },
            set(v) {
                this.data = { ...this.data, ...v }
            }
        },
        editor() {
            return this.$refs['modal-editor']
        },
        type({ bilet }) {
            return bilet.type
        }
    },
    methods: {
        calculate(v) {
            const { total, ocenca } = this.value
            const ssuda = toNumber(total) - toNumber(v)
            return this.$refs['vidacha'].calculate({ ssuda })  
        },
        onsave() {
            const vozvrat = this.value.model
            const vidacha = this.$refs['vidacha'].model
            return  this.save(vozvrat, vidacha)
        },
        update(v) {
            this.data = { ...v }
        },
        change({ name, value }) {
            this.data = { ...this.data, [name]: value }      
            this.$nextTick(() => {
                this.calculate(this.pay)
            })
        }
    }
}
</script>
<style>

</style>