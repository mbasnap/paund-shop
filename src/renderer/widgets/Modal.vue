<template>
  <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title"> {{ title }} </h5>
    <button type="button" class="close" @click="close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      <slot></slot>
    </div>
    <div class="modal-footer" v-if="footer">
    <button type="button" class="btn btn-secondary" @click="close">{{ t('cansel') }}</button>
    <button type="button" class="btn btn-primary" @click="save" :disabled="disabled">{{ t('save') }}</button>
    </div>
  </div>
</template>

<script>

export default {
props: { title: String, disabled: Boolean,
    footer: { type: Boolean, default: true } 
},

created() {
    this.$on('close', () => {
    this.$parent.$emit('close')
    })
},
computed: {},

methods: {
  t(name) {
    return this.$t(`btn.${name}`)
  },
  save () {
    this.$emit('save', this)
  },
  close () {
    this.$emit('close')
  }
}

}
</script>

<style>

</style>
