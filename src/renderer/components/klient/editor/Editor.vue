<template> 
    <modal-editor ref="modal-editor" :title="t(title)" 
    @save="save(model).then(() => close())" >
    <div class="tabs" >
        <a v-for="(item, key) in tabs" :key="key" :class="{ active: activetab === key }"
        @click="activetab=key" > {{ t(item) }} </a>
    </div>
    <div class="content">
        <tab-one class="tabcontent" v-if="activetab === 0" :value="model" :editMode="true"
        @remove="remove(model).then(close)" >
            <div class="form-row mb-2">
                <textarea class="form-control col" :placeholder="t('issued')"
                v-model="issued"></textarea>
            </div>
        </tab-one>
        <tab-two class="tabcontent" v-if="activetab === 1" :value="model" />
    </div>
    </modal-editor>
</template>
<script>
import { TabOne, TabTwo, TabThree } from './index.js'

import ModalEditor from '@/widgets/Modal.vue'
export default {
    components: { ModalEditor, TabOne, TabTwo, TabThree },
    props: { title: String, value: Object, save: Function, remove: Function },
    provide() {
        return { update: this.update, save: this.save, close: this.close }
    },
    data() {
        return {
            tabs: [ 'tab_1', 'tab_2', 'tab_3' ],
            activetab: 0,
            data: {}
        }
    },
    computed: {
        model({ data, value }) {
            return { ...value, ...data }
        },
        passport: {
            get({ model }) {
                return {...model.passport}
            },
            set(passport) {
                this.update({...this.model, passport})
            }
        },
        issued: {
            get({ passport }) {
                return passport.issued
            },
            set(issued) {
                this.passport = {...this.passport, issued }
            }
        },
        editor() {
            return this.$refs['modal-editor']
        }
    },
    methods: {
        update(v) {
            this.data = v
        },
        close() {
            return this.editor.close()
        },
        t(v) {
          return this.$t(`klient.${v}`)
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