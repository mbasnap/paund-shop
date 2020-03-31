<template> 
    <modal-editor :title="'print'" @print="print" >
        <div >
            <div class="tabs" >
                <a v-for="({ name }, i) in tabs" :key="i" :class="{ active: activetab === i }"
                @click="activetab = i" > {{ name }} </a>
            </div>
            <div class="content" ref="print-content">
                <component v-for="({ tag, value }, i) in tabs" :key="i" :is="tag" class="tabcontent"
                v-show="activetab === i" :value="value">
                </component>
            </div> 
        </div>
    </modal-editor>
</template>
<script>
import { mapGetters } from 'vuex'
import { moment, months, toNumber } from '@/functions'
import ModalEditor from '@/components/ModalPrint'
import Bilet from './bilet'
import Order from './order'
export default {
    components: { ModalEditor, Bilet, Order },
    props: { value: Object },
    data() {
        return {
            activetab: 0,
            zoom: '85%'
        }
    },
    computed: {
        ...mapGetters({
            settings: 'settings',
        }),
        model({ value }) {
            return {...value}
        },
        tabs({ model }) {
            const { number } = model
            const values = (model.values || []).map(value => this.getProps(value))   
            const bilet = { value: model, tag: 'Bilet', name: number ? `${this.t('bilet')} № ${number}` : false }     
            return [bilet, ...values].filter(v => v.name)
        },
        tabName({ activetab, tabs }) {
            const { tag } = tabs[activetab]
            return tag.toLowerCase()
        }

    },
    methods: {
        getProps({ dt, ct, summ }) {
            const { order } = this.model
            const type = dt === '301' ? 'dt' : 'ct'
            const value = {...this.model, type, dt, ct, summ }
            return { value, tag:'Order', name: `${this.t(type + '-short')} № ${order[type]}` }
        },
        t(v) {
            return this.$t('order.' + v)
        },
        onZoom({ value }) {
            this.zoom = value + ''
        },
        print({ send }) {
            const name = this.activetab
            const { zoom, silent } = this.settings[this.tabName]
            const { outerHTML: content } = this.$refs['print-content']
            send("print", { content, zoom, silent })
        }
    }
}
</script>
<style>
.print-only {
    display: none;
}
</style>