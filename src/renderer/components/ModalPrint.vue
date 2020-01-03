<template>
<div class="modal-content">
    <div class="row modal-header">
    <h5 class="col modal-title"> {{ title }} </h5>
    <div class="col-8">
    <div class="row form-group">
        <label class="col" for="formControlRange">Example Range input</label>
        <input type="range" class="col form-control-range">
    </div>
    </div>
    <button type="button" class=" col close" @click="close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div ref="printer-content" class="modal-body">

    <slot></slot>

    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" @click="close">Close</button>
    <button type="button" class="btn btn-primary" @click="print">print</button>
    </div>
</div>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer
export default {
props: { title: String, disabled: Boolean },

created() {
    this.$on('close', () => {
    this.$parent.$emit('close')
    })
},
computed: {
    content({ $refs }) {
        return $refs['printer-content']
    }
},

methods: {
    close () {
        this.$emit('close')
    },
    print() {
        const { outerHTML } = this.content
        ipcRenderer.send("print", outerHTML)
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
