<template> 
    <modal-editor :title="title" :disabled="disabled" @save="save" >
    <div class="tabs" >
        <a v-for="(item, key) in tabs" :key="key" :class="{ active: activetab === key }"
        @click="activetab=key" > {{ item }} </a>
    </div>
    <div class="content">
        <tab-one class="tabcontent" v-if="activetab === 0" :value="model" :full="true"/>
        <tab-two class="tabcontent" v-if="activetab === 1" :value="model" />
        <tab-three class="tabcontent" v-if="activetab === 2" :value="value" />
    </div>
    </modal-editor>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { TabOne, TabTwo, TabThree } from './index.js'

import ModalEditor from '@/widgets/Modal.vue'
export default {
    components: { ModalEditor, TabOne, TabTwo, TabThree },
    props: { title: String, value: Object, update: Function },
    provide() {
        return { update: this.input }
    },
    data() {
        return {
            tabs: [ 'Tab 1', 'Tab 2', 'Tab 3' ],
            activetab: 0,
            data: {}
        }
    },
    computed: {
        model() {
            const { value, data } = this
            return { ...value, ...data }
        },
        disabled ({ data }) {
            return !Object.entries(data)
            .some(([ key, value ]) => this.value[key] !== value ? value : undefined)
        },
        editor() {
            return this.$refs['modal-editor']
        }
    },
    methods: {
        ...mapActions({ saveKlient: 'klient/save' }),
        input(v) {
            this.data = v
        },
        async save(editor) {
            this.update(await this.saveKlient(this.model))
            editor.close()
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