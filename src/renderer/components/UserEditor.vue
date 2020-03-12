<template> 
    <modal-editor ref="modal-editor" :title="t(title)">
    <div class="tabs" >
        <a v-for="(item, key) in tabs" :key="key" :class="{ active: activetab === key }"
        @click="activetab=key" > {{ t(item) }} </a>
    </div>
    <div class="content">
        <div class="tabcontent" v-if="activetab === 0" >
            <div v-for="name in ['family', 'name', 'sername']" :key="name"
            class="form-group row m-0 mt-2">
            <label class="col-sm-4 col-form-label" >{{ name }}</label>
            <input type="text" class="col form-control" :value="fio[name]"
            @change="({ target }) => onChange('fio', { name, value: target.value })">
            </div>
            <div class="form-group row m-0 mt-2">
                <label class="col-sm-4 col-form-label" >e-mail</label>
                <input type="text" class="col form-control" :value="value.email"
                @change="({ target }) => save('email', target.value)">
            </div>
        </div>
        <div class="tabcontent" v-if="activetab === 1" >
            <div v-for="name in ['seria', 'number', 'issued', 'idn']" :key="name"
            class="form-group row m-0 mt-2">
            <label class="col-sm-4 col-form-label" >{{ name }}</label>
            <input type="text" class="col form-control" :value="passport[name]"
            @change="({ target }) => onChange('passport', { name, value: target.value })">
            </div>
        </div>
        <div class="tabcontent" v-if="activetab === 2" >
            <div v-for="name in ['post', 'sity', 'street', 'home']" :key="name"
            class="form-group row m-0 mt-2">
            <label class="col-sm-4 col-form-label" >{{ name }}</label>
            <input type="text" class="col form-control" :value="address[name]"
            @change="({ target }) => onChange('address', { name, value: target.value })">
            </div>
        </div>
        <div class="tabcontent" v-if="activetab === 3" >
            <div class="form-group row m-0 mt-2">
                <label class="col-sm-4 col-form-label" >password</label>
                <input type="text" class="col form-control" :value="value.password"
                @change="({ target }) => save('password', target.value)">
            </div>
        </div>
        <!-- <tab-one class="tabcontent" v-if="activetab === 0" 
        @reset="$emit('reset')" @remove="remove(model).then(close)" /> -->
        <!-- <tab-two class="tabcontent" v-if="activetab === 1" :value="model" /> -->
    </div>
    </modal-editor>
</template>
<script>
// import { mapGetters, mapActions } from 'vuex'

import ModalEditor from '@/widgets/Modal.vue'
export default {
    components: { ModalEditor },
    props: { title: String, value: Object, save: Function },
    data() {
        return {
            tabs: [ 'tab_1', 'tab_2', 'tab_3', 'tab_3' ],
            activetab: 0,
            data: {}
        }
    },
    computed: {
        fio({ value }) {
            return { ...value.fio }
        },
        passport({ value }) {
            return { ...value.passport }
        },
        address({ value }) {
            return { ...value.address }
        },
        editor() {
            return this.$refs['modal-editor']
        }
    },
    methods: {
        onChange(key, { name, value }) {
            this.save(key, {...this[key], [name]: value })           
        },
        // close() {
        //     return this.editor.close()
        // },
        t(v) {
          return v
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