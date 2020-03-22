<template> 
    <modal-editor ref="modal-editor" :title="t('tabs', title)" @save="onsave">
    <div class="tabs" >
        <a v-for="(item) in Object.keys(tabs)" :key="item" :class="{ active: activetab === item }"
        @click="activetab = item" > {{ t('tabs', item) }} </a>
    </div>
    <div class="content">
        <div v-for="([key, item]) in Object.entries(tabs)" :key="key" class="tabcontent" v-show="activetab === key" >
            <div v-for="({ name, teg, type }) in fields(item)" :key="name" class="form-group row m-0 mt-2">
                <label class="col-sm-4 col-form-label">{{ t(key, name) }}</label>
                <div class="col">
                <component :is="teg || 'input'" :type="type || 'text'"
                :class="['form-control', { 'is-invalid': err[name] }]" :value="(model[key] || {})[name]" :name="name"
                @input="({target}) => update(key, target)">{{ (model[key] || {})[name] }}</component>
                <div v-if="err[name]" class="invalid-feedback">{{ t('err', err[name]) }}</div>
                </div>
            </div>
        </div>
    </div>
    </modal-editor>
</template>
<script>

import ModalEditor from '@/widgets/Modal.vue'
export default {
    components: { ModalEditor },
    props: { title: String, value: Object, save: Function },
    data() {
        return {
            tabs: { 
                'fio': ['family', 'name', 'sername'], 
                'passport': ['seria', 'number', { name: 'issued', teg: 'textarea'}, 'idn'],
                'address': ['post', 'sity', 'street', 'home', 'phone', 'email'],
                'password': [{ name: 'password', type: 'password'}, { name: 'confirm', type: 'password'}]
            },
            activetab: 'fio',
            data: {}
        }
    },
    computed: {
        model({ data, value }) {
            return {...value, ...data }
        },
        password({ data }){
            const { password, confirm } = data
            if (password && password === confirm ) return password
        },
        err() {
            // const { password, confirm } = this.model.password
            const confirm = this.notmached(this.data.password || {})
            return { confirm }
        }
    },
    methods: {
        notmached({ password, confirm }) {
            if (password && password  !== confirm) return "not_mached"
        },
        fields(v) {
            return v.map(v => {
                const { name, teg, type } = v
                return { name: name || v, teg, type }
            })
        },
        update(key, { name, value }) {
            const data = {...this.model[key], [name]: value}
            this.data = {...this.data, [key]: data }        
        },
        async onsave() {
            const { fio, passport, address, password } = this.model
            await this.save({ fio, passport, address }, password )
            return this.$refs['modal-editor'].close()
        },
        t(name, value) {
          return this.$t(`${name}.${value}`)
        }
    }
}
</script>
<style>



/* Style the tabs */
.tabs {
    overflow: hidden;
  margin-left: 20px;
    /* margin-bottom: -2px; */
}

.tabs ul {
    list-style-type: none;
    margin-left: 20px;
}

.tabs a{
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
}
.tabs a:last-child { 
    border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
    background-color: #aaa;
    color: #fff;
}

/* Styling for active tab */
.tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
}

/* Style the tab content */
.tabcontent {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1
}
</style>