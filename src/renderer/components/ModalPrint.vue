<template>
<div class="modal-content">
    <div class="row modal-header">
    <h5 class="col modal-title"> {{ title }} </h5>
    <div v-if="zoom" class="col-8">
        <div class="row form-group">
            <label class="col" for="formControlRange">
                <span>Zoom</span> {{ zoom }}
            </label>
            <input type="range" class="col form-control-range"
            @input="v => $emit('zoom', v.target)"
            min="50" max="100" :value="zoom" >
        </div>
    </div>
    <button type="button" class="col-2 close" @click="close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div ref="printer-content" class="modal-body">

    <slot></slot>

    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" @click="close">Close</button>
    <button type="button" class="btn btn-primary"
    @click="onPrint">print</button>
    </div>
</div>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer
export default {
props: { title: String, zoom: String },

created() {
    this.$on('close', () => {
    this.$parent.$emit('close')
    })
},
computed: {

},

methods: {
    close () {
        this.$emit('close')
    },
    onPrint() {
        return this.$emit('print', ipcRenderer)
    }

}

}
</script>

<style>
.modal-header button.close {
    text-align: right;
    padding-right: 30px;
}
.modal-content {
    height: -webkit-fill-available;
}
.modal-body {
    max-height: 400px;
    overflow: auto;
}
</style>
