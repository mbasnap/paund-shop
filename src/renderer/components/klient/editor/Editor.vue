<template> 
<modal-editor class="klient"
    ref="modal-editor" :title="t('tabs', title)" @save="save(model).then(close)">
    <div class="tabs" >
        <a v-for="(item) in Object.keys(tabs)" :key="item" :class="{ active: activetab === item }"
        @click="activetab = item" > {{ t('tabs', item) }} </a>
        <div class="row">
            <div class="col"><svg-print width="25px;" style="text-align: right;"
            @click="print"/> </div>
        </div>
    </div>
    <div class="content">
        <div v-for="([key, item]) in Object.entries(tabs)" :key="key" class="tabcontent" v-show="activetab === key" >
            <div v-for="({ name, teg, type }) in fields(item)" :key="name" class="form-group row m-0 mt-2">
                <label class="col-sm-4 col-form-label">{{ t(key, name) }}</label>
                <div class="col">
                    <component :is="teg || 'input'" :type="type || 'text'"
                    :class="['form-control', { 'is-invalid': err[name] }]"
                    :value="get(key, name)"
                    @input="({target}) => set(key, { name, value: target.value })">{{ get(key, name) }}</component>
                    <div v-if="err[name]" class="invalid-feedback">{{ t('err', err[name]) }}</div>
                </div>
            </div>
            <div class="col mt-3" style="text-align: right;" v-if="action[key]">
                <component :is="action[key].teg" :width="action[key].width"
                @click="action[key].click"/>            
            </div>
        </div>
    </div>
</modal-editor>
</template>
<script>

import { SvgTrash, SvgPrint, SvgAddressCard } from '@/svg'
import ModalEditor from '@/widgets/Modal.vue'
import { PostCity } from './index'
import KlientReport from '@/zvit/klient'
export default {
    components: { ModalEditor, SvgAddressCard, SvgTrash, SvgPrint },
    props: { title: String, value: Object, save: Function, remove: Function, add: Function },
    data() {
        return {
            tabs: { 
                'fio': ['family', 'name', 'sername', 'city', 'bithday'], 
                'passport': ['seria', 'number', { name: 'issued', teg: 'textarea'}, 'date-issue', 'idn'],
                'address': ['post', 'city', 'street', 'home', 'phone' ],
            },
            activetab: 'fio',
            data: {},
            action: {
                fio: {
                    teg: 'SvgTrash',
                    width: '20px',
                    click: () => this.remove(this.model).then(this.close)
                },
                passport: {
                    teg: 'SvgAddressCard',
                    width: '30px',
                    click: () => this.add(this.model).then(this.close)
                }
            }
        }
    },
    computed: {
        fio: {
            get() {
                return this.model
            },
            set({ name, value }) {
                this.data = {...this.data, [name]: value } 
            }
        },
        passport: {
            get() {
                return {...this.model.passport}
            },
            set({ name, value }) {
                const passport = {...this.passport, [name]: value }
                this.data = {...this.data, passport } 
            }
        },
        address: {
            get() {
                return {...this.model.address}
            },
            set({ name, value }) {
                const address = {...this.address, [name]: value }
                this.data = {...this.data, address } 
            }
        },
        model({ data, value }) {
            return { ...value, ...data }
        },
        err() {
            return {  }
        }
    },
    methods: {
        get(key, name) {
            return this[key][name]
        },
        set(key, { name, value }) {
            this[key] = { name, value }           
        },
        fields(v) {
            return v.map(v => {
                const { name = v, teg, type } = v
                return { name, teg, type }
            })
        },
        close() {
            this.$refs['modal-editor'].close()
        },
        print() {
            const value = this.model
            this.$modal.show(KlientReport, { value }, { width: '850', height: '500'})            
        },
        t(name, value) {
          return this.$t(`${name}.${value}`)
        }
    }
}
</script>
<style>
.klient .tabcontent {
    height: 315px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #e1e1e1;
}
</style>