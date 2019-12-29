<template>
<div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title"> {{ title }} </h5>
    <button type="button" class="close" @click="close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div id="printer-content" class="modal-body">

    <slot></slot>

    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" @click="close">Close</button>
    <button type="button" class="btn btn-primary" @click="save" :disabled="disabled">Save</button>
    <button type="button" class="btn btn-primary no-print" @click="print">print</button>
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
computed: {},

methods: {
    save () {
        this.$emit('save', this)
    },
    close () {
        this.$emit('close')
    },
    print() {
        // const content = "<h1> hello </h1>"
        // ipcRenderer.send("print-to-pdf")
        window.print()
    }
}

}
</script>

<style>
@media print {
  @page {
    size: A4;
  }
  body * {
    visibility: hidden;
  }
  #printer-content, #printer-content * {
    visibility: visible;
  }
  #printer-content {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.modal-content {
    height: -webkit-fill-available;
}
.modal-body {
    max-height: 400px;
    overflow: auto;
}
</style>
